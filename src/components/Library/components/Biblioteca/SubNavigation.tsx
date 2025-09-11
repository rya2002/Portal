import React from 'react';
import { FileText, BookOpen, Plus } from 'lucide-react';
import { useAuth } from '/Users/maia2/OneDrive/Área de Trabalho/emergencia-main/forum/FORUM 3.0/Projeto/Portal-1/src/contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

interface SubNavigationProps {
  activeSubTab: string;
  onSubTabChange: (tab: string) => void;
}

export default function SubNavigation({ activeSubTab, onSubTabChange }: SubNavigationProps) {
  const subTabs = [
    { id: 'artigos', label: 'Artigos', icon: FileText },
    { id: 'revistas', label: 'Revistas', icon: BookOpen }
  ];

  const { user } = useAuth();
  const navigate = useNavigate();

  const canPublish =
    user && ['aluno-nejusc', 'professor', 'administrador'].includes(user.userType);

  return (
    <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* Tabs */}
        <div className="flex space-x-6">
          {subTabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onSubTabChange(tab.id)}
                className={`flex items-center space-x-2 py-3 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeSubTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Botão de Publicar */}
        {canPublish && (
          <button
            onClick={() => navigate('/biblioteca/publicar')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            <Plus className="h-4 w-4" />
            <span>Publicar</span>
          </button>
        )}
      </div>
    </div>
  );
}