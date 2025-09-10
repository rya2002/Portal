export interface Usuario {
  id: string;
  nome: string;
  foto?: string;
}

export interface Event {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  local: string;
  earea: string;
  palestrantes: Usuario[];
  duracao?: string;
  gratuito: boolean;
  valor?: number;
  classificacaoIndicativa: string;
  categoria: 'em-andamento' | 'hoje' | 'ultimos-dias' | 'em-breve';
  imagem?: string;
}

export type UserProfile = 'aluno' | 'professor' | 'admin';

export interface User {
  id: string;
  nome: string;
  perfil: UserProfile;
}