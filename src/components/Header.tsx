import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useAuth();
  const currentUser = user || null;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-800">
          NEJUSC - Portal Universitário
        </h1>

        {/* Login ou Perfil */}
        {!currentUser ? (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </Link>
        ) : (
          <Link
            to="/perfil"
            className="flex items-center space-x-3 hover:opacity-80 transition"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-800">{currentUser.name}</p>
              <p className="text-xs text-gray-600">Perfil</p>
            </div>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
            />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;