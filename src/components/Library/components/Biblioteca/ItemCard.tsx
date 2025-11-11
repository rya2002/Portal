import { FileText, BookOpen, Download, Trash2, Tag } from 'lucide-react';
import { Artigo, Revista } from '../../types';
import { useAuth } from '../../../../contexts/AuthContext';
import { downloadPdfRevista, deleteRevista } from '../../../../services/revistaService';
import { downloadPdfArtigo, deleteArtigo } from '../../../../services/artigoService';

type KeywordTag = { id: number; titulo: string };

function normalizeKeywords(k: unknown): KeywordTag[] {
  if (!k) return [];
  const arr = Array.isArray(k) ? k : [];
  return arr.map((x: any): KeywordTag => {
    if (typeof x === 'string') return { id: 0, titulo: x };
    return { id: Number(x?.id) || 0, titulo: String(x?.titulo ?? '') };
  });
}

function formatarData(dataString?: string): string | null {
  if (!dataString) return null;
  const data = new Date(dataString);
  if (isNaN(data.getTime())) return null;

  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${String(data.getDate()).padStart(2, '0')} ${meses[data.getMonth()]} ${data.getFullYear()}`;
}

interface ItemCardProps {
  item: Artigo | Revista;
  tipo: 'artigo' | 'revista';
  onDelete?: (id: string) => void;
}

export default function ItemCard({ item, tipo, onDelete }: ItemCardProps) {
  const { user } = useAuth();
  const canDelete = user && ['admin', 'professor', 'alunoNEJUSC'].includes(user.role);

  const dataFormatada = formatarData(item.publicacao);

  const keywords: KeywordTag[] =
    ((item as any).keywordsNorm as KeywordTag[] | undefined) ??
    normalizeKeywords((item as any).keywords);

  const handleDownload = async (it: Artigo | Revista) => {
		console.log('Downloading item:', it);
    try {
			const hasCover = !!it?.capaUrl;
      if (hasCover) await downloadPdfRevista(it.id, it.titulo);
      else await downloadPdfArtigo(it.id, it.titulo);
    } catch {
      alert('Erro ao baixar PDF. Verifique se o arquivo está disponível.');
    }
  };

  const handleDelete = async (it: Artigo | Revista) => {
    if (!window.confirm(`Tem certeza que deseja excluir "${it.titulo}"?`)) return;

		console.log('Deleting item:', it);

    try {
			const hasCover = !!it?.capaUrl;
			console.log('Has cover:', hasCover);
      if (hasCover) await deleteRevista(it.id);
      else await deleteArtigo(it.id);

      alert(`${tipo === 'revista' ? 'Revista' : 'Artigo'} excluído com sucesso.`);
      onDelete?.(it.id);
    } catch {
      alert('Erro ao excluir o item. Verifique permissão ou tente novamente.');
    }
  };

  // ---------- REVISTA ----------
  if (tipo === 'revista') {
    const revista = item as Revista;
    const temCapa = revista.capaUrl && revista.capaUrl !== 'null';

    return (
      <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow">
        {temCapa ? (
          <img
            src={revista.capaUrl!}
            alt={`Capa da revista ${revista.titulo}`}
            className="w-24 h-32 object-cover rounded-md shadow-md"
          />
        ) : (
          <div className="w-24 h-32 bg-gray-200 flex items-center justify-center rounded-md">
            <BookOpen className="h-8 w-8 text-gray-500" />
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{revista.titulo}</h3>
          <p className="text-sm text-gray-600">{revista.descricao}</p>

          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {keywords.map((k) => (
                <span
                  key={`kw-${k.id}-${k.titulo}`}
                  className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" /> {k.titulo}
                </span>
              ))}
            </div>
          )}

          {dataFormatada && (
            <p className="mt-2 text-xs text-gray-500 flex items-center">
              <BookOpen className="h-4 w-4 mr-1" /> Publicada em {dataFormatada}
            </p>
          )}

          <div className="flex justify-between mt-3">
            <button
              onClick={() => handleDownload(revista)}
              className="inline-flex items-center px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
              <Download className="h-4 w-4 mr-2" /> Baixar PDF
            </button>

            {canDelete && (
              <button
                onClick={() => handleDelete(revista)}
                className="inline-flex items-center px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" /> Excluir
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---------- ARTIGO ----------
  const artigo = item as Artigo;

  return (
    <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow">
      <FileText className="h-10 w-10 text-blue-500" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{artigo.titulo}</h3>
        <p className="text-sm text-gray-600">{artigo.descricao}</p>

        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {keywords.map((k) => (
              <span
                key={`kw-${k.id}-${k.titulo}`}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full flex items-center gap-1"
              >
                <Tag className="h-3 w-3" /> {k.titulo}
              </span>
            ))}
          </div>
        )}

        {dataFormatada && (
          <p className="mt-2 text-xs text-gray-500">Publicado em {dataFormatada}</p>
        )}

        <div className="flex justify-between mt-3">
          <button
            onClick={() => handleDownload(artigo)}
            className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-2" /> Baixar PDF
          </button>

          {canDelete && (
            <button
              onClick={() => handleDelete(artigo)}
              className="inline-flex items-center px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" /> Excluir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
