import { useState, useMemo } from 'react';
import type {
  Artigo,
  Revista,
  FilterState,
  SemestreData,
  Estatisticas
} from '../../Library/types/index'; 

import { artigosMock, revistasMock } from '../data/mockData';

/** tenta ler publicacao ou date de forma segura */
function getPublicationDate(item: any): string | undefined {
  return item?.publicacao ?? item?.date ?? undefined;
}

function getSemestreLabel(dateString?: string): string {
  if (!dateString) return 'Semestre Desconhecido';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) {
    const yearMatch = String(dateString).match(/\b(20\d{2})\b/);
    if (yearMatch) return `Semestre ${yearMatch[1]}`;
    return 'Semestre Desconhecido';
  }
  const year = d.getFullYear();
  const month = d.getMonth();
  const semestreNum = month < 6 ? '1º' : '2º';
  return `${semestreNum} Semestre ${year}`;
}

export function useBiblioteca() {
  const [artigos, setArtigos] = useState<Artigo[]>(artigosMock);
  const [revistas, setRevistas] = useState<Revista[]>(revistasMock);

  const [filtros, setFiltros] = useState<FilterState>({
    busca: '',
    area: '',
    semestre: '',
    autor: '',
    tipo: 'todos'
  });

  const [ordenacao, setOrdenacao] = useState({ field: 'data', direction: 'desc' } as any);

  const dados: SemestreData[] = useMemo(() => {
    const map = new Map<string, SemestreData>();

    const pushArticle = (a: Artigo) => {
      const pub = getPublicationDate(a) ?? '';
      const key = getSemestreLabel(pub);
      if (!map.has(key)) map.set(key, { semestre: key, artigos: [], revistas: [] });
      map.get(key)!.artigos.push(a);
    };

    const pushRevista = (r: Revista) => {
      const pub = getPublicationDate(r) ?? '';
      const key = getSemestreLabel(pub);
      if (!map.has(key)) map.set(key, { semestre: key, artigos: [], revistas: [] });
      map.get(key)!.revistas.push(r);
    };

    const q = filtros.busca?.trim()?.toLowerCase() || '';
    const matchesText = (txt?: string) => !q || (txt || '').toLowerCase().includes(q);

    if (filtros.tipo === 'revistas' || filtros.tipo === 'todos') {
      revistas.forEach(r => {
        if (filtros.semestre && getSemestreLabel(getPublicationDate(r)) !== filtros.semestre) return;
        if (filtros.area && r.area && r.area.toLowerCase() !== filtros.area.toLowerCase()) return;
        if (filtros.autor && !(r.autores || []).some(a => a.toLowerCase().includes(filtros.autor!.toLowerCase()))) return;
        if (q) {
          if (!(matchesText(r.titulo) || matchesText(r.descricao) || matchesText(r.area) || (r.autores || []).some(a => a.toLowerCase().includes(q)))) return;
        }
        pushRevista(r);
      });
    }

    if (filtros.tipo === 'artigos' || filtros.tipo === 'todos') {
      artigos.forEach(a => {
        if (filtros.semestre && getSemestreLabel(getPublicationDate(a)) !== filtros.semestre) return;
        if (filtros.area && a.area && a.area.toLowerCase() !== filtros.area.toLowerCase()) return;
        if (filtros.autor && !(a.autores || []).some(ar => ar.toLowerCase().includes(filtros.autor!.toLowerCase()))) return;
        if (q) {
          if (!(matchesText(a.titulo) || matchesText(a.descricao) || matchesText(a.area) || (a.autores || []).some(ar => ar.toLowerCase().includes(q)))) return;
        }
        pushArticle(a);
      });
    }

    const arr = Array.from(map.values());
    arr.sort((a, b) => {
      const yearA = Number(a.semestre.match(/\d{4}/)?.[0] || 0);
      const yearB = Number(b.semestre.match(/\d{4}/)?.[0] || 0);
      if (yearA !== yearB) return yearB - yearA;
      return a.semestre.localeCompare(b.semestre);
    });

    return arr;
  }, [artigos, revistas, filtros]);

  const estatisticas: Estatisticas = useMemo(() => ({
    totalArtigos: artigos.length,
    totalRevistas: revistas.length,
    totalSemestres: dados.length,
  }), [artigos.length, revistas.length, dados.length]);

  return {
    dados,
    filtros,
    setFiltros,
    ordenacao,
    setOrdenacao,
    estatisticas,
    artigos,
    revistas,
  };
}

export default useBiblioteca;
