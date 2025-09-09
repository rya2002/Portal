import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();


  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Navegação */}
        <nav className="flex space-x-4">
          <Link to="/">Início</Link>
          <Link to="/forum">Fórum</Link>
          <Link to="/biblioteca">Biblioteca</Link>
        </nav>

        {/* Usuário logado */}
        <div>
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Olá, {user?.name}</span>
            <button
              onClick={() => {
                logout();
                navigate('/'); 
              }}
              className="text-red-600 hover:underline"
            >
              Sair
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Entrar
          </button>
        )}
      </div>
      </div>
    </header>
  );
}

