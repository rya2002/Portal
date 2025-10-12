import { Search, RotateCcw } from 'lucide-react';
import { Artigo, FilterState, Revista } from '../../types';
import { extrairAreas, extrairAutores, ordenarSemestres } from '../../utils/semestre';

interface FiltrosEBuscaProps {
  filtros: FilterState;
  onFiltrosChange: (filtros: FilterState) => void;
  artigos: Artigo[];   // <-- ADICIONE a prop de artigos
  revistas: Revista[]; // <-- ADICIONE a prop de revistas
}

export default function FiltrosEBusca({ 
  filtros, 
  onFiltrosChange, 
  artigos,      // <-- RECEBA a prop aqui
  revistas      // <-- RECEBA a prop aqui
}: FiltrosEBuscaProps) {
  // Agora, use as props em vez do mock
  const areas = extrairAreas(artigos, revistas);
  const autores = extrairAutores(artigos, revistas);

  const semestres = ordenarSemestres(
    Array.from(new Set([...artigos, ...revistas].map(item => {
      // O resto desta função continua igual...
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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      {/* Barra de Busca */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por título, autor, área ou palavra-chave..."
            value={filtros.busca}
            onChange={(e) => onFiltrosChange({ ...filtros, busca: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Área */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Área
          </label>
          <select
            value={filtros.area}
            onChange={(e) => onFiltrosChange({ ...filtros, area: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">Todas as áreas</option>
            {areas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        {/* Semestre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Semestre
          </label>
          <select
            value={filtros.semestre}
            onChange={(e) => onFiltrosChange({ ...filtros, semestre: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">Todos os semestres</option>
            {semestres.map(semestre => (
              <option key={semestre} value={semestre}>{semestre}</option>
            ))}
          </select>
        </div>

        {/* Autor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Autor
          </label>
          <select
            value={filtros.autor}
            onChange={(e) => onFiltrosChange({ ...filtros, autor: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">Todos os autores</option>
            {autores.map(autor => (
              <option key={autor} value={autor}>{autor}</option>
            ))}
          </select>
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tipo
          </label>
          <select
            value={filtros.tipo}
            onChange={(e) => onFiltrosChange({ ...filtros, tipo: e.target.value as FilterState['tipo'] })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Limpar Filtros</span>
        </button>
      </div>
    </div>
  );
}