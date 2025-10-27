// src/services/searchService.ts
import api from './api';

export interface SearchResult {
  query: string;
  resultado: {
    data: any[]; // Pode ajustar conforme o modelo de GetConteudoQuery
    success: boolean;
    message?: string;
  };
}

export async function searchConteudo(query: string): Promise<SearchResult> {
  if (!query.trim()) {
    throw new Error('A consulta não pode estar vazia.');
  }

  try {
    const res = await api.get(`/search`, { params: { query } });
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Nenhum resultado encontrado para os termos informados.');
    }
    throw new Error('Erro ao buscar conteúdo. Tente novamente mais tarde.');
  }
}
