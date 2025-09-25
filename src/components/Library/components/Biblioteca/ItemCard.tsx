import { FileText, BookOpen, Download } from 'lucide-react';
import { Artigo, Revista } from '../../types';

interface ItemCardProps {
  item: Artigo | Revista;
  tipo: 'artigo' | 'revista';
}

export default function ItemCard({ item, tipo }: ItemCardProps) {
  // helper para pegar a URL do PDF (prioriza arquivopdf, cai em pdfUrl)
  const getPdfHref = (it: any) => {
    if (!it) return '';
    // arquivopdf pode ser só um nome/filename — adapte se você salva o arquivo em /uploads/ ou usa URL completa
    return it.arquivopdf && it.arquivopdf.length > 0 ? it.arquivopdf : (it.pdfUrl || '');
  };

  if (tipo === 'revista') {
    const revista = item as Revista;
    const pdfHref = getPdfHref(revista);

    return (
      <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        {revista.capa && (
          <img
            src={revista.capa}
            alt={`Capa da revista ${revista.titulo}`}
            className="w-24 h-32 object-cover rounded-md shadow-md"
          />
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {revista.titulo}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {revista.descricao}
          </p>

          {/* Autores */}
          {revista.autores?.length > 0 && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              <strong>Autores:</strong> {revista.autores.join(', ')}
            </p>
          )}

          <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
            <BookOpen className="h-4 w-4 mr-1" />
            Revista publicada em {revista.publicacao}
          </div>

          {/* Botão de download */}
          {pdfHref ? (
            <a
              href={pdfHref}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar PDF
            </a>
          ) : null}
        </div>
      </div>
    );
  }

  // caso artigo
  const artigo = item as Artigo;
  const pdfHref = getPdfHref(artigo);

  return (
    <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex-shrink-0">
        <FileText className="h-10 w-10 text-blue-500" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {artigo.titulo}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {artigo.descricao}
        </p>

        {/* Autores */}
        {artigo.autores?.length > 0 && (
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            <strong>Autores:</strong> {artigo.autores.join(', ')}
          </p>
        )}

        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Artigo publicado em {artigo.publicacao}
        </div>

        {/* Botão de download */}
        {pdfHref ? (
          <a
            href={pdfHref}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Baixar PDF
          </a>
        ) : null}
      </div>
    </div>
  );
}
