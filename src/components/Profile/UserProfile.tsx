import React from 'react';
import { Mail, User, Shield, Calendar, Award, MapPin } from 'lucide-react';

interface UserProps {
  name: string;
  email: string;
  userType: 'visitante' | 'aluno-comum' | 'aluno-nejusc' | 'professor' | 'administrador';
  avatar: string;
  joinDate: string;
  institution: string;
  department?: string;
  permissions: string[];
}

interface UserProfileProps {
  user: UserProps;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const getUserTypeLabel = (type: string) => {
    const labels = {
      visitante: 'Visitante',
      'aluno-comum': 'Aluno',
      'aluno-nejusc': 'Aluno NEJUSC',
      professor: 'Professor',
      administrador: 'Administrador'
    };
    return labels[type as keyof typeof labels];
  };

  const getUserTypeColor = (type: string) => {
    const colors = {
      visitante: 'bg-gray-100 text-gray-800',
      'aluno-comum': 'bg-green-100 text-green-800',
      'aluno-nejusc': 'bg-emerald-100 text-emerald-800',
      professor: 'bg-blue-100 text-blue-800',
      administrador: 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors];
  };

  const getPermissionLabels = (permissions: string[]) => {
    const labels: Record<string, string> = {
      view: 'Visualizar',
      comment: 'Comentar',
      publish: 'Publicar',
      review: 'Revisar',
      moderate: 'Moderar',
      manage_permissions: 'Gerenciar Permissões',
      participate_research: 'Participar de Pesquisas',
      full_access: 'Acesso Completo',
      user_management: 'Gerenciar Usuários',
      content_management: 'Gerenciar Conteúdo',
      system_config: 'Configurar Sistema'
    };
    
    return permissions.map(perm => labels[perm] || perm);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Perfil do Usuário</h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Avatar e informações principais */}
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
          />
          <div className="mt-4 text-center lg:text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getUserTypeColor(user.userType)}`}>
              {getUserTypeLabel(user.userType)}
            </span>
          </div>
        </div>
        
        {/* Informações detalhadas */}
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail size={18} className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800 font-medium">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin size={18} className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Instituição</p>
                  <p className="text-gray-800 font-medium">{user.institution}</p>
                </div>
              </div>
              
              {user.department && (
                <div className="flex items-center">
                  <User size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Departamento</p>
                    <p className="text-gray-800 font-medium">{user.department}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar size={18} className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Membro desde</p>
                  <p className="text-gray-800 font-medium">{user.joinDate}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Award size={18} className="text-gray-500 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500 mb-2">Permissões</p>
                  <div className="flex flex-wrap gap-1">
                    {getPermissionLabels(user.permissions).map((permission, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Estatísticas rápidas */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Estatísticas</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-xs text-gray-600">Artigos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">45</p>
                <p className="text-xs text-gray-600">Comentários</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">1.2k</p>
                <p className="text-xs text-gray-600">Visualizações</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;