import { useState, useEffect, useMemo } from 'react';
import type {
  Artigo,
  Revista,
  FilterState,
  SemestreData,
  Estatisticas,
  SortState
} from '../types/index';
import { getAllArtigos } from '../../../services/artigoService';
import { getAllRevistas } from '../../../services/revistaService';

/** Lê a data de publicação de forma segura */
function getPublicationDate(item: any): string | undefined {
  return item?.publicacao ?? item?.date ?? undefined;
}

/** Converte data em rótulo de semestre */
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

/** Normaliza keywords */
function normalizeKeywords(k: any): { id: number; titulo: string }[] {
  if (!k) return [];
  const arr = Array.isArray(k) ? k : [];
  return arr.map((x: any) => {
    if (typeof x === 'string') return { id: 0, titulo: x };
    return { id: Number(x?.id) || 0, titulo: String(x?.titulo ?? '') };
  });
}

/** Lê título da keyword */
function getKeywordTitle(k: any): string {
  return typeof k === 'string' ? k : String(k?.titulo ?? '');
}

export function useBiblioteca() {
  // Estados principais + agora setters expostos
  const [artigos, setArtigos] = useState<(Artigo & { keywordsNorm?: { id: number; titulo: string }[] })[]>([]);
  const [revistas, setRevistas] = useState<(Revista & { keywordsNorm?: { id: number; titulo: string }[] })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  /** Carrega do backend */
  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);

        const [artigosRes, revistasRes] = await Promise.all([
          getAllArtigos(),
          getAllRevistas()
        ]);

        setArtigos(
          (artigosRes || []).map((a: any) => ({
            ...a,
            keywordsNorm: normalizeKeywords(a.keywords)
          }))
        );

        setRevistas(
          (revistasRes || []).map((r: any) => ({
            ...r,
            keywordsNorm: normalizeKeywords(r.keywords)
          }))
        );
      } catch (error) {
        console.error('Erro ao carregar dados da biblioteca:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  /** Filtros + agrupamento por semestre */
  const dados: SemestreData[] = useMemo(() => {
    const map = new Map<string, SemestreData>();

    const pushArticle = (a: Artigo) => {
      const key = getSemestreLabel(getPublicationDate(a));
      if (!map.has(key)) map.set(key, { semestre: key, artigos: [], revistas: [] });
      map.get(key)!.artigos.push(a);
    };

    const pushRevista = (r: Revista) => {
      const key = getSemestreLabel(getPublicationDate(r));
      if (!map.has(key)) map.set(key, { semestre: key, artigos: [], revistas: [] });
      map.get(key)!.revistas.push(r);
    };

    const q = filtros.busca.trim().toLowerCase();
    const matchesText = (txt?: string) => !q || (txt ?? '').toLowerCase().includes(q);

    if (filtros.tipo === 'revistas' || filtros.tipo === 'todos') {
      revistas.forEach((r) => {
        if (filtros.semestre && getSemestreLabel(getPublicationDate(r)) !== filtros.semestre) return;
        if (filtros.area && r.area?.toLowerCase() !== filtros.area.toLowerCase()) return;
        if (filtros.autor && !(r.autores ?? []).some(a => a.toLowerCase().includes(filtros.autor.toLowerCase()))) return;

        if (q) {
          const kws = r.keywordsNorm ?? normalizeKeywords((r as any).keywords);
          const keywordMatch = (kws ?? []).some(k => getKeywordTitle(k).toLowerCase().includes(q));

          if (!(matchesText(r.titulo) || matchesText(r.descricao) || matchesText(r.area) || keywordMatch)) return;
        }

        pushRevista(r);
      });
    }

    if (filtros.tipo === 'artigos' || filtros.tipo === 'todos') {
      artigos.forEach((a) => {
        if (filtros.semestre && getSemestreLabel(getPublicationDate(a)) !== filtros.semestre) return;
        if (filtros.area && a.area?.toLowerCase() !== filtros.area.toLowerCase()) return;
        if (filtros.autor && !(a.autores ?? []).some(ar => ar.toLowerCase().includes(filtros.autor.toLowerCase()))) return;

        if (q) {
          const kws = a.keywordsNorm ?? normalizeKeywords((a as any).keywords);
          const keywordMatch = (kws ?? []).some(k => getKeywordTitle(k).toLowerCase().includes(q));

          if (!(matchesText(a.titulo) || matchesText(a.descricao) || matchesText(a.area) || keywordMatch)) return;
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

  /** Estatísticas */
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

    // ✅ Expostos agora:
    setArtigos,
    setRevistas,

    loading
  };
}
