export interface Artigo {
  id: string;
  titulo: string;
  descricao: string;
  publicacao: string;
  arquivopdf: string;
  autores: string[];
  area: string;
  keywords: string[];
}

export interface Revista {
  id: string;
  titulo: string;
  descricao: string;
  edicao: string;
  capaUrl?: string;
  publicacao: string;
  arquivopdf: string;
  autores: string[];
  area: string;
  keywords: string[];
}

export interface SemestreData {
  semestre: string;
  artigos: Artigo[];
  revistas: Revista[];
}

export type SortField = 'titulo' | 'data' | 'area' | 'autores';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  busca: string;
  area: string;
  semestre: string;
  autor: string;
  tipo: 'todos' | 'artigos' | 'revistas';
}

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

/** SubTabs disponíveis na Biblioteca */
export type SubTab = 'artigo' | 'revista';

/** Dados agregados de estatísticas da Biblioteca */
export interface Estatisticas {
  totalArtigos: number;
  totalRevistas: number;
  totalSemestres: number;
}
