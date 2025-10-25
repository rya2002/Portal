import React, { useEffect } from 'react';
import { useBiblioteca } from '../../hooks/useBiblioteca';
import SemestreSection from './SemestreSection';
import type { SubTab } from '../../types';

interface BibliotecaViewProps {
  subtab: SubTab;
}

const BibliotecaView: React.FC<BibliotecaViewProps> = ({ subtab }) => {
  const {
    dados,
    filtros,
    setFiltros,
    estatisticas,
  } = useBiblioteca();

  // 🔹 Aplica filtro automaticamente conforme a subtab
  useEffect(() => {
    setFiltros(prev => ({
      ...prev,
      tipo:
        subtab === 'artigo'
          ? 'artigos'
          : subtab === 'revista'
          ? 'revistas'
          : 'todos',
    }));
  }, [subtab, setFiltros]);

  // 🔹 Permite trocar manualmente o tipo
  const handleTipoChange = (tipo: 'todos' | 'artigos' | 'revistas') => {
    setFiltros(prev => ({ ...prev, tipo }));
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Cabeçalho e filtros */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
          Biblioteca Digital
        </h1>

        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-md border ${
              filtros.tipo === 'todos' ? 'bg-neutral-200 dark:bg-neutral-700' : ''
            }`}
            onClick={() => handleTipoChange('todos')}
          >
            Todos
          </button>
          <button
            className={`px-3 py-1 rounded-md border ${
              filtros.tipo === 'artigos' ? 'bg-neutral-200 dark:bg-neutral-700' : ''
            }`}
            onClick={() => handleTipoChange('artigos')}
          >
            Artigos
          </button>
          <button
            className={`px-3 py-1 rounded-md border ${
              filtros.tipo === 'revistas' ? 'bg-neutral-200 dark:bg-neutral-700' : ''
            }`}
            onClick={() => handleTipoChange('revistas')}
          >
            Revistas
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        <p>
          <strong>{estatisticas.totalArtigos}</strong> artigos,
          <strong> {estatisticas.totalRevistas}</strong> revistas, em
          <strong> {estatisticas.totalSemestres}</strong> semestres.
        </p>
      </div>

      {/* Listagem por semestre */}
      <div>
        {dados.length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-400">
            Nenhum conteúdo encontrado.
          </p>
        ) : (
          dados.map(({ semestre, artigos, revistas }) => (
            <SemestreSection
              key={semestre}
              semestre={semestre}
              artigos={artigos}
              revistas={revistas}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BibliotecaView;
