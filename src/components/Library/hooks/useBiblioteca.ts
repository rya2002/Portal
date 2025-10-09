// src/hooks/useBiblioteca.ts

import { useState, useEffect, useMemo } from 'react';
import { getAllArtigos, getAllRevistas } from '../../../services/api'; //  Importe as funções da API
import type {
  Artigo,
  Revista,
  FilterState,
  SemestreData,
  Estatisticas,
  SortState
} from '../types/index';

// Suas funções auxiliares (getPublicationDate, getSemestreLabel) permanecem as mesmas...
function getPublicationDate(item: any): string | undefined {
  // ...código da função...
  return item?.publicacao ?? item?.date ?? undefined;
}

function getSemestreLabel(dateString?: string): string {
  // ...código da função...
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
  // 🔹 NOVOS ESTADOS para controlar o carregamento da API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Os estados agora começam vazios. A API vai preenchê-los.
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [revistas, setRevistas] = useState<Revista[]>([]);

  // Seus estados de filtro e ordenação continuam iguais
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

  // 🔹 EFEITO PARA BUSCAR DADOS DA API QUANDO O HOOK É USADO PELA PRIMEIRA VEZ
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Busca artigos e revistas ao mesmo tempo para mais performance
        const [artigosResponse, revistasResponse] = await Promise.all([
          getAllArtigos(),
          getAllRevistas()
        ]);
        setArtigos(artigosResponse.data.data);
        setRevistas(revistasResponse.data.data); // .primeiro data para o axios, o segundo para o formato da API.
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar dados da API:", err);
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // O array vazio [] garante que isso só roda uma vez.

  const dados: SemestreData[] = useMemo(() => {
    // ...seu código de useMemo para 'dados' não muda NADA...
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
        if (filtros.area && r.area?.toLowerCase() !== filtros.area.toLowerCase()) return;
        if (filtros.autor && !(r.autores || []).some(a => a.toLowerCase().includes(filtros.autor.toLowerCase()))) return;
        if (q) {
          if (!(matchesText(r.titulo) || matchesText(r.descricao) || matchesText(r.area) || (r.autores || []).some(a => a.toLowerCase().includes(q)))) return;
        }
        pushRevista(r);
      });
    }

    if (filtros.tipo === 'artigos' || filtros.tipo === 'todos') {
      artigos.forEach(a => {
        if (filtros.semestre && getSemestreLabel(getPublicationDate(a)) !== filtros.semestre) return;
        if (filtros.area && a.area?.toLowerCase() !== filtros.area.toLowerCase()) return;
        if (filtros.autor && !(a.autores || []).some(ar => ar.toLowerCase().includes(filtros.autor.toLowerCase()))) return;
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

  const adicionarArtigo = (novo: Artigo) => {
    setArtigos(prev => [...prev, novo]);
  };

  const adicionarRevista = (nova: Revista) => {
    setRevistas(prev => [...prev, nova]);
  };

  // 🔹 ADICIONAMOS loading E error AO RETORNO DO HOOK
  return {
    dados,
    filtros,
    setFiltros,
    ordenacao,
    setOrdenacao,
    estatisticas,
    loading, // Para o seu componente saber que está carregando
    error,   // Para o seu componente exibir uma mensagem de erro
    adicionarArtigo,
    adicionarRevista
  };
}