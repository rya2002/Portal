import { FileText, BookOpen, Download, Trash2 } from 'lucide-react';
import { Artigo, Revista } from '../../types';

interface ItemCardProps {
  item: Artigo | Revista;
  tipo: 'artigo' | 'revista';
  onRemove?: (id: string) => void; // 🔥 novo callback para remover
}

export default function ItemCard({ item, tipo, onRemove }: ItemCardProps) {
  // Helper para pegar a URL/Base64 do PDF
  const getPdfHref = (it: any) => {
    if (!it) return '';
    return it.arquivopdf && it.arquivopdf.length > 0
      ? it.arquivopdf
      : (it.pdfUrl || '');
  };

  const handleDownload = (it: any) => {
    const pdfHref = getPdfHref(it);
    if (!pdfHref) {
      alert('Nenhum PDF disponível para este item.');
      return;
    }

    const link = document.createElement('a');
    link.href = pdfHref;
    link.download = `${it.titulo}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemove = () => {
    if (!onRemove) return;
    if (confirm(`Tem certeza que deseja remover "${item.titulo}"?`)) {
      onRemove(item.id);
    }
  };

  /* ---------------------------------------------------------
     REVISTA
  -----------------------------------------------------------*/
  if (tipo === 'revista') {
    const revista = item as Revista;

    return (
      <div className="relative flex items-start space-x-4 bg-white p-4 rounded-lg shadow">
        
        {/* Botão de remover no topo direito */}
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 p-1 text-red-600 hover:text-red-800"
          title="Remover"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        {revista.capa ? (
          <img
            src={revista.capa}
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

          {/* Botão Download */}
          <button
            onClick={() => handleDownload(revista)}
            className="mt-3 inline-flex items-center px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Baixar PDF
          </button>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------
     ARTIGO
  -----------------------------------------------------------*/
  const artigo = item as Artigo;

  return (
    <div className="relative flex items-start space-x-4 bg-white p-4 rounded-lg shadow">

      {/* Botão de remover no topo direito */}
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 p-1 text-red-600 hover:text-red-800"
        title="Remover"
      >
        <Trash2 className="w-5 h-5" />
      </button>

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

        {/* Botão Download */}
        <button
          onClick={() => handleDownload(artigo)}
          className="mt-3 inline-flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Baixar PDF
        </button>
      </div>
    </div>
  );
}
