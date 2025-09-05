import { useState, useMemo } from 'react';
import { Artigo, Revista, SemestreData, FilterState, SortState } from '../types';
import { getSemestre, ordenarSemestres } from '../utils/semestre';
import { artigosMock, revistasMock } from '../data/mockData';

export function useBiblioteca() {
  const [filtros, setFiltros] = useState<FilterState>({
    busca: '',
    area: '',
    semestre: '',
    autor: '',
    tipo: 'todos'
  });

  const [ordenacao, setOrdenacao] = useState<SortState>({
    field: 'data',
    direction: 'desc'
  });

  const dadosOrganizados = useMemo(() => {
    let artigos = artigosMock;
    let revistas = revistasMock;

    // Aplicar filtros
    if (filtros.busca) {
      const busca = filtros.busca.toLowerCase();
      artigos = artigos.filter(item =>
        item.titulo.toLowerCase().includes(busca) ||
        item.descricao.toLowerCase().includes(busca) ||
        item.autores.some(autor => autor.toLowerCase().includes(busca)) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(busca))
      );
      revistas = revistas.filter(item =>
        item.titulo.toLowerCase().includes(busca) ||
        item.descricao.toLowerCase().includes(busca) ||
        item.autores.some(autor => autor.toLowerCase().includes(busca)) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(busca))
      );
    }

    if (filtros.area) {
      artigos = artigos.filter(item => item.area === filtros.area);
      revistas = revistas.filter(item => item.area === filtros.area);
    }

    if (filtros.autor) {
      artigos = artigos.filter(item => 
        item.autores.some(autor => autor === filtros.autor)
      );
      revistas = revistas.filter(item => 
        item.autores.some(autor => autor === filtros.autor)
      );
    }

    if (filtros.semestre) {
      artigos = artigos.filter(item => getSemestre(item.publicacao) === filtros.semestre);
      revistas = revistas.filter(item => getSemestre(item.publicacao) === filtros.semestre);
    }

    // Organizar por semestres
    const semestres = new Map<string, SemestreData>();

    artigos.forEach(artigo => {
      const sem = getSemestre(artigo.publicacao);
      if (!semestres.has(sem)) {
        semestres.set(sem, { semestre: sem, artigos: [], revistas: [] });
      }
      semestres.get(sem)!.artigos.push(artigo);
    });

    revistas.forEach(revista => {
      const sem = getSemestre(revista.publicacao);
      if (!semestres.has(sem)) {
        semestres.set(sem, { semestre: sem, artigos: [], revistas: [] });
      }
      semestres.get(sem)!.revistas.push(revista);
    });

    // Ordenar dentro de cada semestre
    semestres.forEach(semestreData => {
      semestreData.artigos.sort((a, b) => ordenarItens(a, b, ordenacao));
      semestreData.revistas.sort((a, b) => ordenarItens(a, b, ordenacao));
    });

    // Converter para array e ordenar semestres
    const semestreArray = Array.from(semestres.values());
    const semestresOrdenados = ordenarSemestres(semestreArray.map(s => s.semestre));
    
    return semestresOrdenados.map(sem => semestres.get(sem)!);
  }, [filtros, ordenacao]);

  const estatisticas = useMemo(() => {
    const totalArtigos = artigosMock.length;
    const totalRevistas = revistasMock.length;
    const totalSemestres = new Set([...artigosMock, ...revistasMock].map(item => getSemestre(item.publicacao))).size;
    
    return { totalArtigos, totalRevistas, totalSemestres };
  }, []);

  return {
    dados: dadosOrganizados,
    filtros,
    setFiltros,
    ordenacao,
    setOrdenacao,
    estatisticas
  };
}

function ordenarItens(a: Artigo | Revista, b: Artigo | Revista, sort: SortState) {
  let comparison = 0;
  
  switch (sort.field) {
    case 'titulo':
      comparison = a.titulo.localeCompare(b.titulo);
      break;
    case 'data':
      comparison = new Date(a.publicacao).getTime() - new Date(b.publicacao).getTime();
      break;
    case 'area':
      comparison = a.area.localeCompare(b.area);
      break;
    case 'autores':
      comparison = a.autores[0]?.localeCompare(b.autores[0] || '') || 0;
      break;
  }
  
  return sort.direction === 'desc' ? -comparison : comparison;
}