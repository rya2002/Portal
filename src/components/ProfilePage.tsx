import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  logoutRequest,
  getAllUsersRequest,
  updateUserStatusRequest,
} from "../services/userService";

function ProfilePage() {
  const { user, logout } = useAuth();
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    async function carregarUsuarios() {
      try {
        setLoading(true);
        const data = await getAllUsersRequest();
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      } finally {
        setLoading(false);
      }
    }

    if (["admin", "professor"].includes(user.role)) {
      carregarUsuarios();
    }
  }, [user]);

  const handleLogout = async () => {
    if (!window.confirm("Tem certeza que deseja sair?")) return;
    try {
      await logoutRequest();
      logout();
      navigate("/");
    } catch (error) {
      console.error("Erro ao sair:", error);
      alert("Erro ao sair. Por favor, tente novamente.");
    }
  };

  const handlePromover = async (userId: string, novoRole: string) => {
    try {
      await updateUserStatusRequest(userId, novoRole);
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, tipoUsuario: novoRole } : u
        )
      );
      alert(
        novoRole === "alunoNEJUSC"
          ? "Usuário promovido para Aluno NEJUSC com sucesso!"
          : "Usuário revertido para Aluno comum com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao atualizar tipo de usuário:", error);
      alert("Erro ao alterar tipo de usuário. Tente novamente.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">
          Você precisa estar logado para acessar o perfil.
        </p>
      </div>
    );
  }

  const getUserTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      usuario: "Visitante",
      aluno: "Aluno",
      alunoNEJUSC: "Aluno NEJUSC",
      professor: "Professor",
      admin: "Administrador",
    };
    return labels[type] || "Desconhecido";
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="max-w-6xl mx-auto py-10 px-6">
        {/* 🔹 Botão de Voltar para Home */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          ← Voltar para Home
        </button>

        {/* Cabeçalho do Perfil */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex items-center space-x-6">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 capitalize">
              Função: {getUserTypeLabel(user.role)}
            </p>
          </div>
        </div>

        {/* Gerenciamento de usuários (somente professor/admin) */}
        {["admin", "professor"].includes(user.role) && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Gerenciamento de Usuários
            </h3>

            {loading ? (
              <p className="text-gray-600">Carregando usuários...</p>
            ) : (
              <div className="space-y-3">
                {usuarios
                  .filter((u) => u.id !== user.id)
                  .map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{u.nome}</p>
                        <p className="text-sm text-gray-500">{u.email}</p>
                        <p className="text-xs text-gray-400">
                          Função atual: {getUserTypeLabel(u.tipoUsuario)}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {u.tipoUsuario === "aluno" ? (
                          <button
                            onClick={() =>
                              handlePromover(u.id, "alunoNEJUSC")
                            }
                            className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
                          >
                            Promover a NEJUSC
                          </button>
                        ) : u.tipoUsuario === "alunoNEJUSC" ? (
                          <button
                            onClick={() => handlePromover(u.id, "aluno")}
                            className="px-4 py-2 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 transition"
                          >
                            Reverter para Aluno
                          </button>
                        ) : (
                          <span className="text-sm text-gray-400">
                            {getUserTypeLabel(u.tipoUsuario)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botão de sair */}
      <button
        onClick={handleLogout}
        className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
      >
        Sair
      </button>
    </div>
  );
}

export default ProfilePage;
