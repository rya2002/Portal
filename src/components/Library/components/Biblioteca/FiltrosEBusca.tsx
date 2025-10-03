import { Search, RotateCcw } from 'lucide-react';
import { FilterState } from '../../types';
import { extrairAreas, extrairAutores, ordenarSemestres } from '../../utils/semestre';
import { artigosMock, revistasMock } from '../../data/mockData';

interface FiltrosEBuscaProps {
  filtros: FilterState;
  onFiltrosChange: (filtros: FilterState) => void;
}

export default function FiltrosEBusca({ filtros, onFiltrosChange }: FiltrosEBuscaProps) {
  const areas = extrairAreas(artigosMock, revistasMock);
  const autores = extrairAutores(artigosMock, revistasMock);

  const semestres = ordenarSemestres(
    Array.from(new Set([...artigosMock, ...revistasMock].map(item => {
      const data = new Date(item.publicacao);
      const ano = data.getFullYear();
      const mes = data.getMonth() + 1;
      const semestre = (mes <= 6) ? 1 : 2;
      return `${ano}.${semestre}`;
    })))
  );

  const limparFiltros = () => {
    onFiltrosChange({
      busca: '',
      area: '',
      semestre: '',
      autor: '',
      tipo: 'todos'
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Barra de Busca */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por título, autor, área ou palavra-chave..."
            value={filtros.busca}
            onChange={(e) => onFiltrosChange({ ...filtros, busca: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Área */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Área
          </label>
          <select
            value={filtros.area}
            onChange={(e) => onFiltrosChange({ ...filtros, area: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todas as áreas</option>
            {areas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        {/* Semestre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Semestre
          </label>
          <select
            value={filtros.semestre}
            onChange={(e) => onFiltrosChange({ ...filtros, semestre: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos os semestres</option>
            {semestres.map(semestre => (
              <option key={semestre} value={semestre}>{semestre}</option>
            ))}
          </select>
        </div>

        {/* Autor */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Autor
          </label>
          <select
            value={filtros.autor}
            onChange={(e) => onFiltrosChange({ ...filtros, autor: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos os autores</option>
            {autores.map(autor => (
              <option key={autor} value={autor}>{autor}</option>
            ))}
          </select>
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo
          </label>
          <select
            value={filtros.tipo}
            onChange={(e) => onFiltrosChange({ ...filtros, tipo: e.target.value as FilterState['tipo'] })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="todos">Todos</option>
            <option value="artigos">Apenas Artigos</option>
            <option value="revistas">Apenas Revistas</option>
          </select>
        </div>
      </div>

      {/* Ações */}
      <div className="flex justify-between items-center">
        <button
          onClick={limparFiltros}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Limpar Filtros</span>
        </button>
      </div>
    </div>
  );
}