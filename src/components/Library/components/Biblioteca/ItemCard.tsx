import { FileText, BookOpen } from 'lucide-react';
import { Artigo, Revista } from '../../types';

interface ItemCardProps {
  item: Artigo | Revista;
  tipo: 'artigo' | 'revista';
}

export default function ItemCard({ item, tipo }: ItemCardProps) {
  if (tipo === 'revista') {
    const revista = item as Revista;

    return (
      <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <img
          src={revista.capa}
          alt={`Capa da revista ${revista.titulo}`}
          className="w-24 h-32 object-cover rounded-md shadow-md"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {revista.titulo}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {revista.descricao}
          </p>
          <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
            <BookOpen className="h-4 w-4 mr-1" />
            Revista publicada em {revista.publicacao}
          </div>
        </div>
      </div>
    );
  }

  // caso artigo
  const artigo = item as Artigo;

  return (
    <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex-shrink-0">
        <FileText className="h-10 w-10 text-blue-500" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {artigo.titulo}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {artigo.descricao}
        </p>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Autor: {artigo.autores}
        </div>
      </div>
    </div>
  );
}
