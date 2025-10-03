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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">
            Ordenar por:
          </span>
          <div className="flex items-center space-x-2">
            {campos.map(({ field, label }) => (
              <button
                key={field}
                onClick={() => handleFieldChange(field)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  ordenacao.field === field
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-800 hover:border-gray-300 hover:bg-gray-100'
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
        
        <div className="text-sm text-gray-600">
          {totalItens} resultado{totalItens !== 1 ? 's' : ''} encontrado{totalItens !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}