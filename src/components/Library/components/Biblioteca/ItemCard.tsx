import { FileText, BookOpen, Download, Trash2 } from 'lucide-react';
import { Artigo, Revista } from '../../types';
import { useAuth } from '../../../../contexts/AuthContext';
import { downloadPdfRevista, deleteRevista } from '../../../../services/revistaService';
import { downloadPdfArtigo, deleteArtigo } from '../../../../services/artigoService';

interface ItemCardProps {
  item: Artigo | Revista;
  tipo: 'artigo' | 'revista';
  onDelete?: (id: string) => void;
}

export default function ItemCard({ item, tipo, onDelete }: ItemCardProps) {
  const { user } = useAuth();
  const canDelete = user && ['admin', 'professor', 'alunoNEJUSC'].includes(user.role);

  const handleDownload = async (it: Artigo | Revista) => {
    try {
      if (tipo === 'revista') {
        await downloadPdfRevista(it.id);
      } else {
        await downloadPdfArtigo(it.id);
      }
    } catch {
      alert('Erro ao baixar PDF. Verifique se o arquivo está disponível.');
    }
  };

  const handleDelete = async (it: Artigo | Revista) => {
    if (
      !window.confirm(
        `Tem certeza que deseja excluir "${it.titulo}"? Essa ação não pode ser desfeita.`
      )
    ) {
      return;
    }

    try {
      if (tipo === 'revista') {
        await deleteRevista(it.id);
      } else {
        await deleteArtigo(it.id);
      }

      alert(`${tipo === 'revista' ? 'Revista' : 'Artigo'} excluído com sucesso.`);
      if (onDelete) onDelete(it.id);
    } catch {
      alert('Erro ao excluir o item. Verifique sua permissão ou tente novamente.');
    }
  };

  if (tipo === 'revista') {
    const revista = item as Revista;

    return (
      <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow">
        {revista.capaUrl ? (
          <img
            src={revista.capaUrl}
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

          {revista.autores?.length > 0 && (
            <p className="text-sm text-gray-700 mt-2">
              <strong>Autores:</strong> {revista.autores.join(', ')}
            </p>
          )}

          <div className="mt-2 flex items-center text-xs text-gray-500">
            <BookOpen className="h-4 w-4 mr-1" />
            Revista publicada em {revista.publicacao}
          </div>

          <div className="flex justify-between mt-3">
            <button
              onClick={() => handleDownload(revista)}
              className="inline-flex items-center px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar PDF
            </button>

            {canDelete && (
              <button
                onClick={() => handleDelete(revista)}
                className="inline-flex items-center px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const artigo = item as Artigo;

  return (
    <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow">
      <div className="flex-shrink-0">
        <FileText className="h-10 w-10 text-blue-500" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{artigo.titulo}</h3>
        <p className="text-sm text-gray-600">{artigo.descricao}</p>

        {artigo.autores?.length > 0 && (
          <p className="text-sm text-gray-700 mt-2">
            <strong>Autores:</strong> {artigo.autores.join(', ')}
          </p>
        )}

        <div className="mt-2 text-xs text-gray-500">
          Artigo publicado em {artigo.publicacao}
        </div>

        <div className="flex justify-between mt-3">
          <button
            onClick={() => handleDownload(artigo)}
            className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Baixar PDF
          </button>

          {canDelete && (
            <button
              onClick={() => handleDelete(artigo)}
              className="inline-flex items-center px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
