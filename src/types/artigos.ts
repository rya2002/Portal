export interface ArtigoDTO {
  id: string;
  titulo: string;
  descricao: string;
  publicacao: string;
  arquivopdf?: string | null;
  autores: string[];
  area: number;
  keywords: { id: number; titulo: string }[];
}

export interface CreateArtigoPayload {
  titulo: string;
  descricao: string;
  publicacao: string;
  autores: string[];
  area: number;
  keywordsIds: number[];
}
