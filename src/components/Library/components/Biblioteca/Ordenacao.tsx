import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { SortState, SortField } from '../../types';

interface OrdenacaoProps {
  ordenacao: SortState;
  onOrdenacaoChange: (ordenacao: SortState) => void;
  totalItens: number;
}

export default function Ordenacao({ ordenacao, onOrdenacaoChange, totalItens }: OrdenacaoProps) {
  const campos: { field: SortField; label: string }[] = [
    { field: 'titulo', label: 'Título' },
    { field: 'data', label: 'Data' },
    { field: 'area', label: 'Área' },
    { field: 'autores', label: 'Autores' }
  ];

  const handleFieldChange = (field: SortField) => {
    if (ordenacao.field === field) {
      onOrdenacaoChange({
        field,
        direction: ordenacao.direction === 'asc' ? 'desc' : 'asc'
      });
    } else {
      onOrdenacaoChange({ field, direction: 'asc' });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Ordenar por:
          </span>
          <div className="flex items-center space-x-2">
            {campos.map(({ field, label }) => (
              <button
                key={field}
                onClick={() => handleFieldChange(field)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  ordenacao.field === field
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>{label}</span>
                {ordenacao.field === field ? (
                  ordenacao.direction === 'asc' ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )
                ) : (
                  <ArrowUpDown className="h-3 w-3 opacity-50" />
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {totalItens} resultado{totalItens !== 1 ? 's' : ''} encontrado{totalItens !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}