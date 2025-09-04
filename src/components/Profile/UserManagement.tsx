import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  UserPlus, 
  CheckCircle, 
  XCircle, 
  Clock,
  Shield,
  ChevronDown
} from 'lucide-react';
import { UserManagement as UserManagementType } from '../../../../../../../../Tela de Perfil/src/data/mockData';

interface UserManagementProps {
  users: UserManagementType[];
  currentUserType: string;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, currentUserType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todos');
  const [filterStatus, setFilterStatus] = useState('todos');

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'inativo':
        return <Clock size={16} className="text-yellow-500" />;
      case 'suspenso':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      ativo: 'bg-green-100 text-green-800',
      inativo: 'bg-yellow-100 text-yellow-800',
      suspenso: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'todos' || user.userType === filterType;
    const matchesStatus = filterStatus === 'todos' || user.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const canManageUser = (targetUserType: string) => {
    if (currentUserType === 'administrador') return true;
    if (currentUserType === 'professor') {
      return ['visitante', 'aluno-comum', 'aluno-nejusc'].includes(targetUserType);
    }
    return false;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Gerenciar Usuários</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <UserPlus size={16} className="mr-2" />
          Novo Usuário
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar usuários..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="todos">Todos os tipos</option>
            <option value="visitante">Visitantes</option>
            <option value="aluno-comum">Alunos</option>
            <option value="aluno-nejusc">Alunos NEJUSC</option>
            <option value="professor">Professores</option>
            <option value="administrador">Administradores</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        
        <div className="relative">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="todos">Todos os status</option>
            <option value="ativo">Ativos</option>
            <option value="inativo">Inativos</option>
            <option value="suspenso">Suspensos</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Lista de usuários */}
      <div className="space-y-4">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-8">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Nenhum usuário encontrado.</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={20} className="text-gray-500" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUserTypeColor(user.userType)}`}>
                        {getUserTypeLabel(user.userType)}
                      </span>
                      <div className="flex items-center">
                        {getStatusIcon(user.status)}
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <p className="text-xs text-gray-500">
                    Último acesso: {user.lastAccess}
                  </p>
                  
                  {canManageUser(user.userType) && (
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar usuário">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remover usuário">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Estatísticas */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-blue-600">{users.filter(u => u.status === 'ativo').length}</p>
          <p className="text-sm text-gray-600">Usuários Ativos</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-green-600">{users.filter(u => u.userType === 'professor').length}</p>
          <p className="text-sm text-gray-600">Professores</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-purple-600">{users.filter(u => u.userType.includes('aluno')).length}</p>
          <p className="text-sm text-gray-600">Alunos</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-yellow-600">{users.filter(u => u.status === 'suspenso').length}</p>
          <p className="text-sm text-gray-600">Suspensos</p>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;