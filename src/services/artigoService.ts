import api from './api';

export interface ArtigoDTO {
  id: string;
  titulo: string;
  descricao: string;
  publicacao: string;
  arquivopdf?: any;
  autores: string[];
  area: number;
  keywords: { id: number; titulo: string }[];
}

export interface CreateArtigoPayload {
  titulo: string;
  descricao: string;
  publicacao: string;
  autores: string[];
  area: number;               // ⬅️ Ajustado
  keywordsIds: number[];
}

export async function getAllArtigos(): Promise<ArtigoDTO[]> {
  const res = await api.get('/artigos');

  const arr = Array.isArray(res.data?.data)
    ? res.data.data
    : Array.isArray(res.data)
    ? res.data
    : [];

  return arr.map((a: any): ArtigoDTO => ({
    id: a.id,
    titulo: a.titulo,
    descricao: a.descricao,
    publicacao: a.publicacao,
    arquivopdf: a.arquivopdf,
    autores: a.autores ?? [],
    area: Number(a.area) ?? 0, // ⬅️ garante number
    keywords: (a.keywords ?? []).map((k: any) => ({
      id: Number(k.id),
      titulo: k.titulo,
    })),
  }));
}

export async function getArtigoById(id: string): Promise<ArtigoDTO> {
  const res = await api.get(`/artigos/${id}`);
  const a = res.data?.data ?? res.data;

  return {
    id: a.id,
    titulo: a.titulo,
    descricao: a.descricao,
    publicacao: a.publicacao,
    arquivopdf: a.arquivopdf,
    autores: a.autores ?? [],
    area: Number(a.area) ?? 0,
    keywords: (a.keywords ?? []).map((k: any) => ({
      id: Number(k.id),
      titulo: k.titulo,
    })),
  };
}

/** POST – criar artigo já enviando keywordsIds */
export async function createArtigo(data: CreateArtigoPayload) {
  const res = await api.post('/artigos', data);
  return res.data?.data ?? res.data;
}

export async function updateArtigo(id: string, data: Partial<CreateArtigoPayload>) {
  const res = await api.put(`/artigos/${id}`, data);
  return res.data;
}

export async function deleteArtigo(id: string) {
  await api.delete(`/artigos/${id}`);
  return true;
}

export async function downloadPdfArtigo(id: string, titulo?: string) {
  const res = await api.get(`/artigos/${id}/download`, { responseType: 'blob' });

  const url = window.URL.createObjectURL(res.data);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${titulo ?? 'artigo'}-${id}.pdf`;
  a.click();
  window.URL.revokeObjectURL(url);
}

export async function uploadPdfArtigo(id: string, file: File) {
  const form = new FormData();
  form.append('ArquivoPdf', file);

  await api.put(`/artigos/${id}/upload`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
