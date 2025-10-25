import React from "react";
import { PlusCircle, MessageSquare, Settings } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { createForum } from "../services/forumService"; // <-- integração aqui

type Props = {
  activeTab: 'discussions' | 'manage' | 'request-publication';
  onTabChange: (id: Props['activeTab']) => void;
};

const ForumNavigation: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();

  const isAdmin = ['administrador', 'professor'].includes(user?.userType || '');
  const isAuthenticated = user?.userType && user?.userType !== 'visitante';

  const tabs = [
    { id: 'discussions' as const, label: 'Discussões', icon: MessageSquare, available: true },
    { id: 'manage' as const, label: 'Gerenciar Fórum', icon: Settings, available: isAdmin },
  ];

  const handleSolicitarPublicacao = async () => {
    try {
      const newForum = {
        titulo: "Nova solicitação de publicação",
        conteudo: "Conteúdo de teste para integração com o back-end",
        autorId: user?.id || "usuário-teste",
      };

      const response = await createForum(newForum);
      console.log("Fórum criado com sucesso:", response);
      alert("Solicitação de publicação enviada!");
      onTabChange('request-publication');
    } catch (error) {
      console.error("Erro ao criar fórum:", error);
      alert("Erro ao solicitar publicação.");
    }
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Abas à esquerda */}
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              if (!tab.available) return null;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Botão de Solicitar Publicação */}
          <div>
            {isAuthenticated && (
              <button
                onClick={handleSolicitarPublicacao}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Solicitar Publicação</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumNavigation;
