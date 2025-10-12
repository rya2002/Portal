import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { loginRequest, logoutRequest } from "../services/api";

// A interface User deve corresponder ao que sua API retorna no login
interface User {
  id: string;
  nomeCompleto: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Começa true para verificar a sessão

  // ======================= INÍCIO DA MODIFICAÇÃO =======================
  // Efeito que roda uma única vez quando a aplicação carrega
  useEffect(() => {
    // Tenta encontrar os dados do usuário no localStorage
    const storedUser = localStorage.getItem('@Portal:user');

    if (storedUser) {
      // Se encontrou, restaura o usuário no estado
      setUser(JSON.parse(storedUser));
    }

    // Termina o carregamento inicial
    setIsLoading(false);
  }, []);
  // ======================== FIM DA MODIFICAÇÃO ========================

  const login = async (credentials: any) => {
    try {
      const response = await loginRequest(credentials);
      if (response.data.success) {
        const loggedInUser = response.data.usuario;
        
        // ======================= INÍCIO DA MODIFICAÇÃO =======================
        // Salva o usuário no localStorage para persistir a sessão
        localStorage.setItem('@Portal:user', JSON.stringify(loggedInUser));
        // ======================== FIM DA MODIFICAÇÃO ========================

        setUser(loggedInUser);
      } else {
        throw new Error(response.data.message || "Falha no login");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      // ======================= INÍCIO DA MODIFICAÇÃO =======================
      // Remove o usuário do localStorage ao fazer logout
      localStorage.removeItem('@Portal:user');
      // ======================== FIM DA MODIFICAÇÃO ========================
      
      setUser(null);
    }
  };

  // Enquanto verifica a sessão, pode mostrar uma tela de carregamento
  if (isLoading) {
    return <div>Carregando sessão...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
};