import { useEffect, useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { FilterState } from '../../types';
import { getAllArtigos } from '../../../../services/artigoService';
import { getAllRevistas } from '../../../../services/revistaService';
import { extrairAreas, extrairAutores, ordenarSemestres } from '../../utils/semestre';

interface FiltrosEBuscaProps {
  filtros: FilterState;
  onFiltrosChange: (filtros: FilterState) => void;
}

// Mapa do enum para exibição
const AREA_LABELS: Record<number, string> = {
  0: "Direitos e Vulnerabilidades",
  1: "Maternidade Solo",
  2: "Ambulantes no Carnaval",
  3: "Racismo Ambiental",
  4: "Saúde Pública",
  5: "Violência e Gênero",
  6: "Pessoas com Deficiência",
};

export default function FiltrosEBusca({ filtros, onFiltrosChange }: FiltrosEBuscaProps) {
  const [areas, setAreas] = useState<number[]>([]);
  const [autores, setAutores] = useState<string[]>([]);
  const [semestres, setSemestres] = useState<string[]>([]);

  useEffect(() => {
    async function carregarFiltros() {
      try {
        const [artigos, revistas] = await Promise.all([
          getAllArtigos(),
          getAllRevistas(),
        ]);

        setAreas(extrairAreas(artigos, revistas));  // Agora retorna number[]
        setAutores(extrairAutores(artigos, revistas));

        const semestresUnicos = ordenarSemestres(
          Array.from(
            new Set(
              [...artigos, ...revistas].map((item) => {
                const data = new Date(item.publicacao);
                const ano = data.getFullYear();
                const semestre = data.getMonth() + 1 <= 6 ? 1 : 2;
                return `${ano}.${semestre}`;
              })
            )
          )
        );

        setSemestres(semestresUnicos);
      } catch (err) {
        console.error('Erro ao carregar filtros:', err);
      }
    }

    carregarFiltros();
  }, []);

  const limparFiltros = () => {
    onFiltrosChange({
      busca: '',
      area: '',
      semestre: '',
      autor: '',
      tipo: 'todos',
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">

      {/* Busca */}
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
          <label className="block text-sm font-medium text-gray-700">Área</label>
          <select
            value={filtros.area}
            onChange={(e) => onFiltrosChange({ ...filtros, area: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas as áreas</option>
            {areas.map((areaNum) => (
              <option key={areaNum} value={String(areaNum)}>
                {AREA_LABELS[areaNum] ?? `Área ${areaNum}`}
              </option>
            ))}
          </select>
        </div>

        {/* Semestre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Semestre</label>
          <select
            value={filtros.semestre}
            onChange={(e) => onFiltrosChange({ ...filtros, semestre: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos os semestres</option>
            {semestres.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        {/* Autor */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Autor</label>
          <select
            value={filtros.autor}
            onChange={(e) => onFiltrosChange({ ...filtros, autor: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos os autores</option>
            {autores.map((autor) => (
              <option key={autor} value={autor}>
                {autor}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo</label>
          <select
            value={filtros.tipo}
            onChange={(e) => onFiltrosChange({ ...filtros, tipo: e.target.value as FilterState['tipo'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="todos">Todos</option>
            <option value="artigos">Apenas Artigos</option>
            <option value="revistas">Apenas Revistas</option>
          </select>
        </div>

      </div>

      {/* Botão limpar */}
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
