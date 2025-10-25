// src/types/auth.ts
import { UserProfile } from '@/services/userService';

/**
 * Representa o usuário autenticado no front-end.
 * Espelha parcialmente o tipo retornado pelo backend,
 * mas adaptado ao formato usado no portal.
 */
export interface User extends Omit<UserProfile, 'userType' | 'nome'> {
  name: string; // mapeia 'nome' do backend
  role: 'visitante' | 'aluno' | 'aluno-nejusc' | 'professor' | 'admin'; // mapeia 'userType'
}

/**
 * Representa o contexto de autenticação do portal.
 */
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

/**
 * Outras interfaces usadas pelo portal.
 */
export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  category: string;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  authorRole: string;
  createdAt: string;
  likes: number;
}

export interface PublicationRequest {
  id: string;
  title: string;
  description: string;
  studentName: string;
  studentEmail: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
}
