// src/services/userService.ts
import api from './api';

export async function loginRequest(credentials: any) {
  const res = await api.post('/usuario/Login', credentials);
  return res.data;
}

export async function registerRequest(userData: any) {
  const res = await api.post('/usuario', userData);
  return res.data;
}

export async function logoutRequest() {
  const res = await api.post('/usuario/Logout');
  return res.data;
}
// src/services/userService.ts
import api from './api';

// A interface para 'userData' deve corresponder ao seu CreateUserCommand no backend
interface RegisterUserData {
    nome: string;
    email: string;
    senha: string; // Senha já criptografada pelo front-end
}

// Seu service de registro usa o endpoint '/usuario'
export async function registerRequest(userData: RegisterUserData) {
  // Chamada para POST /api/usuario
  const res = await api.post('/usuario', userData);
  // O seu controller retorna 201 CreatedAtAction, que retorna o corpo do comando.
  return res.data; 
}

// As outras funções (login e logout)
export async function loginRequest(credentials: any) {
  const res = await api.post('/usuario/Login', credentials);
  return res.data;
}

export async function logoutRequest() {
  const res = await api.post('/usuario/Logout');
  return res.data;
}