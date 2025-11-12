// src/services/searchService.ts
import api from "./api";

/** Representa uma publicação retornada pelo backend */
export interface Publicacao {
  titulo: string;
  descricao: string;
  pdfUrl?: string;
}

/** Estrutura padrão retornada pela API */
export interface SearchResponse {
  data: Publicacao[];
  success: boolean;
  message?: string;
}

/**
 * Faz a busca de conteúdos (artigos e revistas) via IA.
 * Retorna um objeto normalizado sempre com 'data' como array.
 */
export async function searchConteudo(query: string): Promise<SearchResponse> {
  if (!query.trim()) {
    throw new Error("A consulta não pode estar vazia.");
  }

  try {
    // 🔹 Chamada para o endpoint do backend
    const res = await api.get("/search", { params: { query } });
    const raw = res.data ?? {};

    // 🔹 Normaliza o formato da resposta (caso o backend mude estrutura)
    const arr: any[] = Array.isArray(raw?.data)
      ? raw.data
      : Array.isArray(raw)
      ? raw
      : Array.isArray(raw?.resultado)
      ? raw.resultado
      : [];

    return {
      data: arr as Publicacao[],
      success: Boolean(raw?.isSuccess ?? raw?.success ?? true),
      message: raw?.message,
    };
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Nenhum resultado encontrado para os termos informados.");
    }
    throw new Error("Erro ao buscar conteúdo. Tente novamente mais tarde.");
  }
}
