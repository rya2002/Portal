import React, { useState } from 'react';
import { Download, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { Artigo, Revista } from '../../types';
import { formatarData } from '../../utils/semestre';

interface ItemCardProps {
  item: Artigo | Revista;
  tipo: 'artigo' | 'revista';
}

export default function ItemCard({ item, tipo }: ItemCardProps) {
  const [expandido, setExpandido] = useState(false);
  const isRevista = tipo === 'revista';
  const revista = isRevista ? item as Revista : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        {/* Capa da revista (se aplicável) */}
        {isRevista && revista?.capa && (
          <div className="flex-shrink-0">
            <img
              src={revista.capa}
              alt={`Capa de ${revista.titulo}`}
              className="w-16 h-20 object-cover rounded-md"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Cabeçalho */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {item.titulo}
              </h3>
              {isRevista && revista?.edicao && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {revista.edicao}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => window.open(item.arquivopdf, '_blank')}
                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="Visualizar PDF"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = item.arquivopdf;
                  link.download = `${item.titulo}.pdf`;
                  link.click();
                }}
                className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                title="Download PDF"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Metadados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Autores: </span>
              <span className="text-gray-900 dark:text-white">
                {item.autores.join(', ')}
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Área: </span>
              <span className="text-gray-900 dark:text-white bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                {item.area}
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Publicação: </span>
              <span className="text-gray-900 dark:text-white">
                {formatarData(item.publicacao)}
              </span>
            </div>
          </div>

          {/* Resumo */}
          <div className="mb-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {expandido ? item.descricao : `${item.descricao.slice(0, 150)}...`}
            </p>
            {item.descricao.length > 150 && (
              <button
                onClick={() => setExpandido(!expandido)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1 flex items-center space-x-1"
              >
                <span>{expandido ? 'Ver menos' : 'Ver mais'}</span>
                {expandido ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </button>
            )}
          </div>

          {/* Palavras-chave */}
          <div className="flex flex-wrap gap-2">
            {item.keywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}