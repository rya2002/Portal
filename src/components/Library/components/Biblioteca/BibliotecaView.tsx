import { useState } from 'react';
import { useBiblioteca } from '../../hooks/useBiblioteca'; 
import SubNavigation from './SubNavigation'; 
import FiltrosEBusca from './FiltrosEBusca';
import Estatisticas from './Estatisticas';
import SemestreSection from './SemestreSection';
import type { FilterState, SubTab, SemestreData } from '../../types'; 

export default function BibliotecaView() {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('artigo');

  const {
    dados,
    filtros,
    setFiltros,
    estatisticas,
    removerArtigo,
    removerRevista
  } = useBiblioteca(); // ← agora inclui as funções de remover

  const tipoAtivo: SubTab = activeSubTab;

  const totalItens = dados.reduce((total: number, semestre: SemestreData) => {
    return total + (tipoAtivo === 'artigo' ? semestre.artigos.length : semestre.revistas.length);
  }, 0);

  return (
    <div>
      <SubNavigation
        activeSubTab={activeSubTab}
        onSubTabChange={setActiveSubTab}
      />

      {/* Botão SciELO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex justify-end">
        <a
          href="https://www.scielo.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-700 transition-colors"
        >
          Acessar SciELO
        </a>
      </div>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Estatisticas
          totalArtigos={estatisticas.totalArtigos}
          totalRevistas={estatisticas.totalRevistas}
          totalSemestres={estatisticas.totalSemestres}
        />

        <FiltrosEBusca
          filtros={filtros as FilterState}
          onFiltrosChange={setFiltros}
        />

        {dados.length > 0 ? (
          <div>
            {dados.map((semestreData: SemestreData) => (
              <SemestreSection
                key={semestreData.semestre}
                semestreData={semestreData}
                tipoAtivo={tipoAtivo}

                // 🔥 Agora enviamos as funções necessárias
                onRemoveArtigo={removerArtigo}
                onRemoveRevista={removerRevista}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhum resultado encontrado
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Tente ajustar seus filtros de busca
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
