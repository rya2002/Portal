// Header.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        {/* Esquerda */}
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Início
          </Link>
          <Link to="/forum" className="text-gray-700 hover:text-blue-600 font-medium">
            Fórum
          </Link>
          <Link to="/biblioteca" className="text-gray-700 hover:text-blue-600 font-medium">
            Biblioteca
          </Link>
        </div>

        {/* Direita */}
        <div>
          {user ? (
            <Link
              to="/perfil"
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <img
                src={user.avatar || "https://via.placeholder.com/30"}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <span>{user.name}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Fazer Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

