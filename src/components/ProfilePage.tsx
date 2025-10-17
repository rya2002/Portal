import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { logoutRequest } from "../services/userService";

import Sidebar from "../components/Profile/Sidebar";
import ArticlesList from "../components/Profile/ArticlesList";
import PostsList from "../components/Profile/PostsList";
import CommentsList from "../components/Profile/CommentsList";
import AdminSection from "../components/Profile/AdminSection";
import UserManagement from "../components/Profile/UserManagement";
import PermissionsManagement from "../components/Profile/PermissionsManagement";
import ReviewSection from "../components/Profile/ReviewSection";

import {
  mockPublishedArticles,
  mockAccessedArticles,
  mockPosts,
  mockComments,
  mockUsersManagement,
  mockUsers,
  promoteToNejusc,
} from "../data/mockData";

import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("perfil");
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmar = window.confirm("Tem certeza que deseja sair?");
    if (!confirmar) return;

    try {
      // 💡 CHAMADA PADRONIZADA: Usa a função do service
      await logoutRequest();

      // Se a chamada do service for bem-sucedida (sem lançar erro),
      // o processo de logout é concluído no frontend.
      logout();
      navigate("/");
    } catch (error) {
      // Qualquer erro (incluindo falha de rede ou resposta de erro do servidor)
      // é capturado aqui.
      console.error("Erro ao fazer logout:", error);
      // Mensagem genérica, já que o service lida com o erro HTTP
      alert("Erro ao sair. Por favor, tente novamente.");
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

  const renderContent = () => {
    switch (activeSection) {
      case "perfil":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-6">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-blue-500"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 capitalize">
                  Função: {getUserTypeLabel(user.userType)}
                </p>
              </div>
            </div>

            {/* 🔹 Apenas para professores e administradores */}
            {["professor", "administrador"].includes(user.userType) && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Promover Alunos para NEJUSC
                </h3>
                <div className="space-y-3">
                  {Object.values(mockUsers)
                    .filter((u) => u.userType === "aluno-comum")
                    .map((u) => (
                      <div
                        key={u.email}
                        className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                      >
                        <span className="text-gray-700">{u.name}</span>
                        <button
                          onClick={() => {
                            const result = promoteToNejusc(user, u.email);
                            alert(result);
                          }}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
                        >
                          Promover
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        );

      case "artigos-publicados":
        if (
          !["aluno-nejusc", "professor", "administrador"].includes(user.userType)
        )
          return null;
        return (
          <ArticlesList
            articles={mockPublishedArticles}
            type="published"
            userType={user.userType}
          />
        );

      case "artigos-acessados":
        return (
          <ArticlesList
            articles={mockAccessedArticles}
            type="accessed"
            userType={user.userType}
          />
        );

      case "postagens":
        if (
          !["aluno-nejusc", "professor", "administrador"].includes(user.userType)
        )
          return null;
        return <PostsList posts={mockPosts} />;

      case "comentarios":
        if (user.userType === "visitante") return null;
        return <CommentsList comments={mockComments} />;

      case "revisoes":
        if (!["professor", "administrador"].includes(user.userType)) return null;
        return <ReviewSection userType={user.userType} />;

      case "gerenciar-permissoes":
        if (!["professor", "administrador"].includes(user.userType)) return null;
        return <PermissionsManagement currentUserType={user.userType} />;

      case "gerenciar-usuarios":
        if (user.userType !== "administrador") return null;
        return (
          <UserManagement
            users={mockUsersManagement}
            currentUserType={user.userType}
          />
        );

      case "analytics":
      case "configuracoes":
      case "moderacao":
      case "gerenciar-conteudo":
        if (user.userType !== "administrador") return null;
        return <AdminSection section={activeSection} />;

      default:
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Seção não encontrada
            </h2>
            <p className="text-gray-600">
              A seção solicitada não foi encontrada ou você não tem permissão
              para acessá-la.
            </p>
          </div>
        );
    }
  };

  const getUserTypeLabel = (type: string) => {
    const labels = {
      visitante: "Visitante",
      "aluno-comum": "Aluno",
      "aluno-nejusc": "Aluno NEJUSC",
      professor: "Professor",
      administrador: "Administrador",
    };
    return labels[type as keyof typeof labels];
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="flex">
        <Sidebar
          userType={user.userType}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div className="flex-1 lg:ml-0">
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="ml-12 lg:ml-0">
                <h1 className="text-2xl font-bold text-gray-800">
                  NEJUSC - Portal Universitário
                </h1>
                <p className="text-gray-600 text-sm">
                  Núcleo de Estudos em Justiça Social - Unijorge Salvador BA
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {getUserTypeLabel(user.userType)}
                  </p>
                </div>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
                />
              </div>
            </div>
          </header>

          <main className="p-6">
            <div className="max-w-7xl mx-auto">{renderContent()}</div>
          </main>
        </div>
      </div>

      {/* 🔹 Botão de Sair no canto inferior direito */}
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
