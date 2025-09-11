import React, { useState } from 'react';
import { useBiblioteca } from '../../hooks/useBiblioteca';
import SubNavigation from './SubNavigation';
import FiltrosEBusca from './FiltrosEBusca';
import Ordenacao from './Ordenacao';
import Estatisticas from './Estatisticas';
import SemestreSection from './SemestreSection';

export default function BibliotecaView() {
  const [activeSubTab, setActiveSubTab] = useState('artigo');
  const { dados, filtros, setFiltros, ordenacao, setOrdenacao, estatisticas } = useBiblioteca();

  const tipoAtivo = activeSubTab as 'artigo' | 'revista';
  const totalItens = dados.reduce((total, semestre) => {
    return total + (tipoAtivo === 'artigo' ? semestre.artigos.length : semestre.revistas.length);
  }, 0);

  return (
    <div>
      <SubNavigation
        activeSubTab={activeSubTab}
        onSubTabChange={setActiveSubTab}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Estatisticas
          totalArtigos={estatisticas.totalArtigos}
          totalRevistas={estatisticas.totalRevistas}
          totalSemestres={estatisticas.totalSemestres}
        />

        <FiltrosEBusca
          filtros={filtros}
          onFiltrosChange={setFiltros}
        />

        <Ordenacao
          ordenacao={ordenacao}
          onOrdenacaoChange={setOrdenacao}
          totalItens={totalItens}
        />

        {dados.length > 0 ? (
          <div>
            {dados.map((semestreData) => (
              <SemestreSection
                key={semestreData.semestre}
                semestreData={semestreData}
                tipoAtivo={tipoAtivo}
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
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              Nenhum resultado encontrado
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tente ajustar seus filtros de busca
            </p>
          </div>
        )}
      </div>
    </div>
  );
}