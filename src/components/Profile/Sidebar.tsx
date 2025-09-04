import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  Eye, 
  MessageCircle, 
  Edit3, 
  Settings, 
  Menu,
  X,
  BookOpen,
  Users,
  BarChart3,
  Shield,
  UserCog
} from 'lucide-react';

interface SidebarProps {
  userType: 'visitante' | 'aluno-comum' | 'aluno-nejusc' | 'professor' | 'administrador';
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userType, activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getMenuItems = () => {
    const baseItems = [
      { id: 'perfil', label: 'Perfil', icon: User },
      { id: 'artigos-acessados', label: 'Artigos Acessados', icon: Eye },
    ];

    // Alunos comuns podem comentar
    if (userType === 'aluno-comum' || userType === 'aluno-nejusc' || userType === 'professor' || userType === 'administrador') {
      baseItems.push({ id: 'comentarios', label: 'Comentários', icon: MessageCircle });
    }

    // Alunos NEJUSC, professores e administradores podem publicar
    if (userType === 'aluno-nejusc' || userType === 'professor' || userType === 'administrador') {
      baseItems.push(
        { id: 'artigos-publicados', label: 'Artigos Publicados', icon: FileText },
        { id: 'postagens', label: 'Postagens', icon: Edit3 }
      );
    }

    // Professores e administradores podem revisar e moderar
    if (userType === 'professor' || userType === 'administrador') {
      baseItems.push(
        { id: 'revisoes', label: 'Revisões', icon: BookOpen },
        { id: 'moderacao', label: 'Moderação', icon: Shield },
        { id: 'gerenciar-permissoes', label: 'Gerenciar Permissões', icon: UserCog }
      );
    }

    // Administradores têm acesso completo
    if (userType === 'administrador') {
      baseItems.push(
        { id: 'gerenciar-usuarios', label: 'Gerenciar Usuários', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'configuracoes', label: 'Configurações', icon: Settings }
      );
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <h1 className="text-lg font-bold text-center">NEJUSC</h1>
        </div>
        
        <nav className="mt-8 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center px-4 py-3 text-left rounded-lg mb-2 transition-all duration-200
                  ${activeSection === item.id 
                    ? 'bg-blue-100 text-blue-700 font-medium shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }
                `}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;