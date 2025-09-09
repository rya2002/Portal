import React from "react";
import { PlusCircle, MessageSquare, Settings } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  activeTab: 'discussions' | 'manage' | 'request-publication';
  onTabChange: (id: Props['activeTab']) => void;
};

const ForumNavigation: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAdmin   = ['admin', 'administrador'].includes(user?.userType || '');
  const isStudent = ['student', 'aluno-comum', 'aluno-nejusc'].includes(user?.userType || '');

  const tabs = [
    { id: 'discussions' as const, label: 'Discussões',      icon: MessageSquare, available: true     },
    { id: 'manage'      as const, label: 'Gerenciar Fórum', icon: Settings,      available: isAdmin  },
  ];

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

          {/* Só o botão de Solicitar Publicação à direita */}
          <div>
            {isStudent && (
              <button
                onClick={() => onTabChange('request-publication')}
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