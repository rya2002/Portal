import { Book, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const { user } = useAuth() as any; // ajuste a tipagem conforme seu projeto

  // Mostra aba de configuração apenas para professor/administrador.
  const canSeeConfig = !!user && (
    ['professor', 'administrador'].includes(String(user.userType || '').toLowerCase()) ||
    ['professor', 'administrador'].includes(String(user.role || '').toLowerCase())
  );

  const tabs = [
    { id: 'biblioteca', label: 'Biblioteca', icon: Book },
    ...(canSeeConfig ? [{ id: 'configuracao', label: 'Configuração', icon: Settings }] : [])
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
