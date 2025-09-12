import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { LogIn, User, Lock, AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // rota de onde o usuário veio, definida no ProtectedRoute
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true }); // volta para a rota anterior
    } catch (err) {
      setError("Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (userType: "student" | "admin") => {
    const demoUsers = {
      student: {
        email: "ryan.maia@estudante.unijorge.edu.br",
        password: "demo123",
      },
      admin: {
        email: "maria.fatima@nejusc.unijorge.edu.br",
        password: "demo123",
      },
    };

    const { email, password } = demoUsers[userType];
    setEmail(email);
    setPassword(password);

    try {
      await login(email, password);
      navigate(from, { replace: true }); // também volta para a rota anterior
    } catch (err) {
      setError("Erro ao fazer login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <LogIn className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Acessar Fórum</h1>
          <p className="text-gray-600 mt-2">
            Entre com suas credenciais para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center mb-4">
            Para demonstração, use uma das contas abaixo:
          </p>

          <div className="space-y-3">
            <button
              onClick={() => handleDemoLogin("student")}
              className="w-full bg-green-100 text-green-800 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
            >
              🎓 Entrar como Aluno (Ryan Maia)
            </button>

            <button
              onClick={() => handleDemoLogin("admin")}
              className="w-full bg-purple-100 text-purple-800 py-2 px-4 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
            >
              🛠️ Entrar como Professor (Profª Maria de Fátima)
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Continuar como visitante
          </button>
        </div>
      </div>
    </div>
  );
}