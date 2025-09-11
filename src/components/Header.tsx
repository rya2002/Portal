import { Link, useNavigate } from "react-router-dom";
import { useAuth, } from "../contexts/AuthContext";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redireciona para Home após sair
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Título */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 rounded-lg p-2">
              <span className="text-white font-bold">N</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Portal Acadêmico</h1>
          </div>

          {/* Navegação */}
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Início</Link>
            <Link to="/biblioteca" className="text-gray-600 hover:text-gray-900">Biblioteca</Link>
            <Link to="/assistente" className="text-gray-600 hover:text-gray-900">Assistente</Link>
            <Link to="/forum" className="text-gray-600 hover:text-gray-900">Fórum</Link>
            <Link to="/eventos" className = "text-gray-600 hover:text-gray-900">Eventos</Link>
            {!isAuthenticated ? (
              // 🔹 Visitante vê apenas o login
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            ) : (
              //Usuário logado vê avatar + nome com link para perfil
              <div className="flex items-center space-x-4">
                <Link
                  to="/perfil"
                  className="flex items-center space-x-2 group"
                >
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


