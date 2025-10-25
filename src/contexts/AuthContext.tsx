// src/context/AuthContext.tsx
import { createContext, useState, useContext, useEffect } from 'react';
import { AuthContextType, User } from '@/types/auth';
import { loginRequest, logoutRequest } from '../services/userService';
import api from '../services/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // 🔄 Verifica se há token salvo ao carregar o app
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, []);

  // 🔐 Faz login e salva token + usuário
  const login = async (email: string, password: string) => {
    const response = await loginRequest({ email, senha: password });

    if (response.success && response.usuario) {
      const mappedUser: User = {
        id: response.usuario.id,
        name: response.usuario.nome,
        email: response.usuario.email,
        role: response.tipoUsuario || response.usuario.userType || 'visitante',
        avatar: response.usuario.avatar,
      };

      // 🪪 Salva token e usuário no localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(mappedUser));

      // Define o header Authorization global
      api.defaults.headers.Authorization = `Bearer ${response.token}`;

      setUser(mappedUser);
    } else {
      throw new Error(response.message || 'Falha no login');
    }
  };

  // 🚪 Faz logout e limpa tudo
  const logout = async () => {
    await logoutRequest();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    delete api.defaults.headers.Authorization;
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};
