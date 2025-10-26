// src/services/userService.ts

import api from './api';

// --- Interfaces de Tipagem ---

// Interface básica para o perfil do usuário retornado pelo backend
export interface UserProfile {
    id: string; 
    nome: string;
    email: string;
    tipoUsuario: 'admin' | 'professor' | 'alunoNEJUSC' | 'usuario';
    avatar?: string;
    // Adicione outros campos que o seu 'GetAllUsersQuery' retorna, se necessário.
}

// Interface para a criação de usuário (registro)
export interface RegisterUserData {
    nome: string;
    email: string;
    senha: string; 
    // Adicione quaisquer outros campos necessários para o CreateUserCommand
}

// Interface para atualização de usuário
export interface UpdateUserData {
    id: string;
    nome?: string;
    email?: string;
    senha?: string;
    userType?: string;
    avatar?: string;
}

// --- Funções de Serviço (Comunicação com o UsuarioController) ---

/**
 * Envia credenciais para realizar o login.
 * Endpoint: POST /api/usuario/Login
 */
export async function loginRequest(credentials: { email: string; senha: string }) {
    const res = await api.post('/usuario/Login', credentials);
    return res.data;
}

/**
 * Cria um novo usuário (registro).
 * Endpoint: POST /api/usuario
 */
export async function registerRequest(userData: RegisterUserData) {
    const res = await api.post('/usuario', userData);
    return res.data; 
}

/**
 * Realiza o logout, instruindo o backend a deletar o cookie de autenticação.
 * Endpoint: POST /api/usuario/Logout
 */
export async function logoutRequest() {
    const res = await api.post('/usuario/Logout');
    return res.data;
}

/**
 * Busca a lista completa de todos os usuários.
 * Endpoint: GET /api/usuario
 */
export async function getAllUsersRequest(): Promise<UserProfile[]> {
    const res = await api.get('/usuario');
    return res.data as UserProfile[];
}

/**
 * Busca um usuário específico pelo ID.
 * Endpoint: GET /api/usuario/{id}
 */
export async function getUserByIdRequest(id: string): Promise<UserProfile> {
    const res = await api.get(`/usuario/${id}`);
    return res.data as UserProfile;
}

/**
 * Atualiza dados de um usuário.
 * Endpoint: PUT /api/usuario/{id}
 */
export async function updateUserRequest(id: string, data: UpdateUserData): Promise<UserProfile> {
    const res = await api.put(`/usuario/${id}`, data);
    return res.data as UserProfile;
}

/**
 * Exclui um usuário específico.
 * Endpoint: DELETE /api/usuario/{id}
 */
export async function deleteUserRequest(id: string): Promise<void> {
    await api.delete(`/usuario/${id}`);
}

/**
 * Promove um aluno-comum para aluno-nejusc.
 * Endpoint: POST /api/usuario/promote-to-nejusc/{id}
 */
export async function promoteUserToNejuscRequest(userId: string): Promise<void> {
    await api.post(`/usuario/promote-to-nejusc/${userId}`, {}); 
}

/**
 * Altera o tipo de usuário genericamente (ex: visitante -> professor, etc.)
 * Endpoint: POST /api/usuario/change-role/{id}
 */
export async function changeUserRoleRequest(userId: string, newRole: string): Promise<void> {
    await api.post(`/usuario/change-role/${userId}`, { userType: newRole });
}
