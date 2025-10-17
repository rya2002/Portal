// src/services/userService.ts

import api from './api';

// --- Interfaces de Tipagem ---

// Interface básica para o perfil do usuário retornado pelo backend
export interface UserProfile {
    id: string; 
    name: string;
    email: string;
    userType: "visitante" | "aluno-comum" | "aluno-nejusc" | "professor" | "administrador";
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

// --- Funções de Serviço (Comunicação com o UsuarioController) ---

/**
 * Envia credenciais para realizar o login.
 * Endpoint: POST /api/usuario/Login
 */
export async function loginRequest(credentials: any) {
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
    // Seu controller retorna a lista diretamente no corpo da resposta (res.data).
    return res.data as UserProfile[];
}

/**
 * Promove um aluno-comum para aluno-nejusc.
 * Endpoint: POST /api/usuario/promote-to-nejusc/{id}
 * ⚠️ NOTA: Este endpoint POST /api/usuario/promote-to-nejusc/{id} deve ser criado no seu UsuarioController.
 */
export async function promoteUserToNejuscRequest(userId: string): Promise<void> {
    // Se o backend espera um corpo vazio, use {} no