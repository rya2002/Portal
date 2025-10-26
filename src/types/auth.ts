// src/types/auth.ts
import { UserProfile } from '../services/userService';

/**
 * Representa o usuário autenticado no front-end.
 * Espelha parcialmente o tipo retornado pelo backend,
 * mas adaptado ao formato usado no portal.
 */
export interface User extends Omit<UserProfile, 'nome' | 'tipoUsuario'> {
  id: string;
  name: string; // mapeia 'nome' do backend
  email: string;
  role: 'admin' | 'professor' | 'alunoNEJUSC' | 'usuario'; // mapeia 'tipoUsuario' do backend
  avatar?: string;
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
