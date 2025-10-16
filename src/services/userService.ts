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
