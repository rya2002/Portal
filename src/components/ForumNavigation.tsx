import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, Settings, PlusCircle, LogOut, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ForumNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ForumNavigation({ activeTab, onTabChange }: ForumNavigationProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/forum');
  };

  const tabs = [
    {
      id: 'discussions',
      label: 'Discussões',
      icon: MessageSquare,
      available: true
    },
    {
      id: 'manage',
      label: 'Gerenciar Fórum',
      icon: Settings,
      available: user?.role === 'admin'
    }
  ];

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
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
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            {user?.role === 'student' && (
              <button
                onClick={() => onTabChange('request-publication')}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Solicitar Publicação</span>
              </button>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-sm text-gray-700">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <LogIn className="w-4 h-4" />
                <span>Fazer Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}