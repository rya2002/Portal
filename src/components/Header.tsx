import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LogoNejusc from '../assets/LogoNejusc.png';

function Header() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Rotas onde o Header não deve aparecer
  const hideHeaderRoutes = ["/login", "/perfil"];

  if (hideHeaderRoutes.includes(location.pathname)) {
    return null; // Não renderiza nada
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Título (agora também funciona como botão Início) */}
          <Link to="/" className="flex items-center group">
            <img
              src={LogoNejusc}
              alt="Logo NEJUSC"
              className="h-12 w-auto group-hover:opacity-80 transition"
            />
          </Link>


          {/* Navegação */}
          <nav className="flex items-center space-x-6">
            <Link to="/biblioteca" className="text-gray-600 hover:text-gray-900">
              Biblioteca
            </Link>
            <Link to="/chat" className="text-gray-600 hover:text-gray-900">
              Chat
            </Link>
            <Link to="/forum" className="text-gray-600 hover:text-gray-900">
              Fórum
            </Link>
            <Link to="/eventos" className="text-gray-600 hover:text-gray-900">
              Eventos
            </Link>

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/perfil" className="flex items-center space-x-2 group">
                  <img
                    src={user?.avatar || "/default-avatar.png"}
                    alt={user?.name}
                    className="w-9 h-9 rounded-full border-2 border-blue-200 group-hover:opacity-80 transition"
                  />
                  <span className="hidden md:block text-sm font-medium text-gray-800 group-hover:text-blue-600">
                    {user?.name}
                  </span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
