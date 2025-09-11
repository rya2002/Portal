import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User as UserIcon, GraduationCap, Shield, AlertTriangle } from 'lucide-react';

const roleValues = ['student', 'admin', 'visitor'] as const;
type Role = typeof roleValues[number];

function isRole(role: any): role is Role {
  return roleValues.includes(role);
}

export function RoleBanner() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">
              Você está acessando como visitante
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              Faça login para interagir com o conteúdo e participar das discussões.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const roleConfig: Record<Role, {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    bgColor: string;
    borderColor: string;
    textColor: string;
    iconColor: string;
    title: string;
    description: string;
  }> = {
    student: {
      icon: GraduationCap,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600',
      title: '🎓 Aluno',
      description: 'Você pode participar das discussões e solicitar publicações de revistas.',
    },
    admin: {
      icon: Shield,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-400',
      textColor: 'text-purple-800',
      iconColor: 'text-purple-600',
      title: '🛠️ Administrador',
      description: 'Você tem acesso completo para gerenciar o fórum e suas funcionalidades.',
    },
    visitor: {
      icon: UserIcon,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-400',
      textColor: 'text-gray-800',
      iconColor: 'text-gray-600',
      title: '👤 Visitante',
      description: 'Você pode visualizar o conteúdo, mas não pode interagir.',
    },
  };

  const userRole = isRole(user.role) ? user.role : 'visitor';
  const config = roleConfig[userRole];
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} border-l-4 ${config.borderColor} p-4 mb-6`}>
      <div className="flex items-center">
        <Icon className={`w-5 h-5 ${config.iconColor} mr-3`} />
        <div>
          <h3 className={`text-sm font-medium ${config.textColor}`}>
            {config.title} - Olá, {user.name}!
          </h3>
          <p className={`text-sm ${config.textColor.replace('800', '700')} mt-1`}>
            {config.description}
          </p>
        </div>
      </div>
    </div>
  );
}
