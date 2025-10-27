// Tipagem de usuário relacionada a eventos
export interface Usuario {
  id: string;
  nome: string;
  foto?: string;
}

// Tipagem de mídias associadas a eventos
export interface Midia {
  id: string;
  tipo: 'foto' | 'video';
  url: string;
  title?: string;
  caption?: string;
  uploadedBy?: string;
  date?: string;
}

// Payload para adicionar mídia
export interface AddMediaPayload {
  type: 'foto' | 'video';
  url: string;
  title?: string;
}

// Tipagem principal do evento (com base no backend)
export interface Event {
  id: string;
  nome: string;
  descricao: string;
  data: string;
  local: string;
  area: string;
  palestrantes: Usuario[];
  duracao?: string;
  gratuito: boolean;
  valor?: number;
  classificacaoIndicativa: string;
  categoria: 'em-andamento' | 'hoje' | 'ultimos-dias' | 'em-breve';
  imagem?: string;
  midias?: Midia[];
}

// Tipos auxiliares
export interface CreateEventData {
  nome: string;
  descricao: string;
  dataInicio: string;
  local: string;
  area: string;
  gratuito: boolean;
  valor?: number;
  palestrantes: Usuario[];
  classificacaoIndicativa: string;
  categoria: 'em-andamento' | 'hoje' | 'ultimos-dias' | 'em-breve';
  imagem?: string;
}

export interface UpdateEventData extends Partial<CreateEventData> {
  id: string;
}

export type UserProfile = 'aluno' | 'professor' | 'admin';

export interface User {
  id: string;
  nome: string;
  perfil: UserProfile;
}
