// src/services/userService.ts
import api from './api';

// --- Interfaces de Tipagem ---

export interface UserProfile {
  id: string;
  nome: string;
  email: string;
  tipoUsuario: 'admin' | 'professor' | 'alunoNEJUSC' | 'usuario' | number;
  avatar?: string;
}

export interface RegisterUserData {
  nome: string;
  email: string;
  senha: string;
}

export interface UpdateUserData {
  id: string;
  nome?: string;
  email?: string;
  senha?: string;
  userType?: string;
  avatar?: string;
}

// --- Funções de Serviço (Comunicação com o UsuarioController) ---

/** Login de usuário */
export async function loginRequest(credentials: { email: string; senha: string }) {
  const res = await api.post('/usuario/Login', credentials);
  return res.data;
}

/** Registro de novo usuário */
export async function registerRequest(userData: RegisterUserData) {
  const res = await api.post('/usuario', userData);
  return res.data;
}

/** Logout de usuário */
export async function logoutRequest() {
  const res = await api.post('/usuario/Logout');
  return res.data;
}

/** 🔹 Busca todos os usuários de forma segura */
export async function getAllUsersRequest(): Promise<UserProfile[]> {
  const res = await api.get('/usuario');
  const data = res.data;
  // 🔒 Garante que sempre retorne array
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

/** Busca um usuário pelo ID */
export async function getUserByIdRequest(id: string): Promise<UserProfile> {
  const res = await api.get(`/usuario/${id}`);
  return res.data as UserProfile;
}

/** Atualiza um usuário existente */
export async function updateUserRequest(id: string, data: UpdateUserData): Promise<UserProfile> {
  const res = await api.put(`/usuario/${id}`, data);
  return res.data as UserProfile;
}

/** Exclui um usuário */
export async function deleteUserRequest(id: string): Promise<void> {
  await api.delete(`/usuario/${id}`);
}

/** Promove um usuário a aluno-NEJUSC */
export async function promoteUserToNejuscRequest(userId: string): Promise<void> {
  await api.post(`/usuario/promote-to-nejusc/${userId}`, {});
}

/** Altera tipo de usuário (visitante → professor, etc.) */
export async function changeUserRoleRequest(userId: string, newRole: string): Promise<void> {
  await api.post(`/usuario/change-role/${userId}`, { userType: newRole });
}

/** Atualiza o status ou tipo de um usuário */
export async function updateUserStatusRequest(userId: string, novoRole: string): Promise<void> {
  const res = await api.put(`/usuario/${userId}/status`, { tipoUsuario: novoRole });
  if (res.status !== 200 && res.status !== 204) {
    throw new Error("Erro ao atualizar status do usuário.");
  }
}
