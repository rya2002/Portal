// src/services/keywordService.ts
import api from './api';

export type Keyword = { id: number; titulo: string };

/** Normaliza a resposta do backend para sempre virar Keyword[] */
function normalizeListPayload(payload: any): Keyword[] {
  const arr = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];
  return arr
    .filter((k: any) => k && (typeof k.id === 'number' || typeof k.id === 'string'))
    .map((k: any) => ({
      id: typeof k.id === 'string' ? Number(k.id) : k.id,
      titulo: k.titulo ?? '',
    }));
}

/** GET /api/keyword -> Keyword[] */
export async function listKeywords(): Promise<Keyword[]> {
  const res = await api.get('/keyword');
  return normalizeListPayload(res.data);
}

/** POST /api/keyword { titulo } -> retorna Keyword criada (id + titulo) */
export async function createKeyword(titulo: string): Promise<Keyword> {
  const res = await api.post('/keyword', { titulo });

  // o backend pode retornar em formas diferentes; cobrir os casos:
  const raw = res.data?.data ?? res.data;

  // Tentar extrair { id, titulo } de diferentes formatos:
  // Caso 1: { id, titulo }
  if (raw && (typeof raw.id === 'number' || typeof raw.id === 'string')) {
    return { id: Number(raw.id), titulo: raw.titulo ?? titulo };
  }

  // Caso 2: só título retornado; precisamos buscar a lista e pegar o recém-criado
  const all = await listKeywords();
  const found = all.find((k) => k.titulo.toLowerCase() === titulo.toLowerCase());
  if (!found) {
    // fallback extremo: gerar algo coerente (evitar quebrar UX)
    return { id: -1, titulo };
  }
  return found;
}

/**
 * Recebe títulos livres, busca existentes e cria as que faltam.
 * Retorna todas com {id, titulo} únicas por título (case-insensitive).
 */
export async function ensureKeywordsByTitles(titles: string[]): Promise<Keyword[]> {
  const dedupTitles = Array.from(
    new Map(
      titles
        .map((t) => (t ?? '').trim())
        .filter((t) => t.length > 0)
        .map((t) => [t.toLowerCase(), t])
    ).values()
  );

  const existentes = await listKeywords();
  const byTitle = new Map(existentes.map((k) => [k.titulo.toLowerCase(), k]));

  const result: Keyword[] = [];
  for (const t of dedupTitles) {
    const hit = byTitle.get(t.toLowerCase());
    if (hit) {
      result.push(hit);
    } else {
      const created = await createKeyword(t);
      result.push(created);
      byTitle.set(created.titulo.toLowerCase(), created);
    }
  }

  // garantir unicidade final
  const uniq = Array.from(new Map(result.map((k) => [k.titulo.toLowerCase(), k])).values());
  return uniq;
}
