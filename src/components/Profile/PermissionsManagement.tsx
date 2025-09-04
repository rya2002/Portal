import React, { useState } from 'react';
import { 
  UserCog, 
  Search, 
  Save, 
  AlertTriangle,
  CheckCircle,
  User,
  Shield
} from 'lucide-react';

interface PermissionUser {
  id: number;
  name: string;
  email: string;
  userType: string;
  currentPermissions: string[];
}

interface PermissionsManagementProps {
  currentUserType: string;
}

const PermissionsManagement: React.FC<PermissionsManagementProps> = ({ currentUserType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<PermissionUser | null>(null);
  const [pendingPermissions, setPendingPermissions] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const mockPermissionUsers: PermissionUser[] = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@estudante.unijorge.edu.br',
      userType: 'aluno-comum',
      currentPermissions: ['view', 'comment']
    },
    {
      id: 2,
      name: 'Ana Oliveira',
      email: 'ana.oliveira@nejusc.unijorge.edu.br',
      userType: 'aluno-nejusc',
      currentPermissions: ['view', 'comment', 'publish', 'participate_research']
    },
    {
      id: 3,
      name: 'Dr. Pedro Lima',
      email: 'pedro.lima@unijorge.edu.br',
      userType: 'professor',
      currentPermissions: ['view', 'comment', 'publish', 'review', 'moderate']
    }
  ];

  const availablePermissions = [
    { id: 'view', label: 'Visualizar Conteúdo', description: 'Pode visualizar artigos e postagens' },
    { id: 'comment', label: 'Comentar', description: 'Pode fazer comentários em artigos' },
    { id: 'publish', label: 'Publicar', description: 'Pode publicar artigos e postagens' },
    { id: 'review', label: 'Revisar', description: 'Pode revisar artigos submetidos' },
    { id: 'moderate', label: 'Moderar', description: 'Pode moderar comentários e conteúdo' },
    { id: 'participate_research', label: 'Participar de Pesquisas', description: 'Pode participar de projetos de pesquisa' },
    { id: 'manage_permissions', label: 'Gerenciar Permissões', description: 'Pode alterar permissões de outros usuários' }
  ];

  const filteredUsers = mockPermissionUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user: PermissionUser) => {
    setSelectedUser(user);
    setPendingPermissions([...user.currentPermissions]);
    setShowConfirmation(false);
  };

  const handlePermissionToggle = (permissionId: string) => {
    if (pendingPermissions.includes(permissionId)) {
      setPendingPermissions(pendingPermissions.filter(p => p !== permissionId));
    } else {
      setPendingPermissions([...pendingPermissions, permissionId]);
    }
  };

  const handleSavePermissions = () => {
    setShowConfirmation(true);
    // Aqui seria feita a chamada para a API para salvar as permissões
    setTimeout(() => {
      setShowConfirmation(false);
      if (selectedUser) {
        selectedUser.currentPermissions = [...pendingPermissions];
      }
    }, 2000);
  };

  const canManageUser = (targetUserType: string) => {
    if (currentUserType === 'administrador') return true;
    if (currentUserType === 'professor') {
      return ['visitante', 'aluno-comum', 'aluno-nejusc'].includes(targetUserType);
    }
    return false;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <UserCog className="mr-3" size={24} />
        Gerenciar Permissões
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lista de usuários */}
        <div>
          <div className="mb-4">
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
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`
                  p-4 border rounded-lg cursor-pointer transition-all duration-200
                  ${selectedUser?.id === user.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }
                  ${!canManageUser(user.userType) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                onClick={() => canManageUser(user.userType) && handleUserSelect(user)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={16} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getUserTypeColor(user.userType)}`}>
                      {getUserTypeLabel(user.userType)}
                    </span>
                  </div>
                  {!canManageUser(user.userType) && (
                    <Shield size={16} className="text-gray-400" title="Sem permissão para gerenciar" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor de permissões */}
        <div>
          {selectedUser ? (
            <div>
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Editando permissões para:</h3>
                <p className="text-gray-700">{selectedUser.name}</p>
                <p className="text-sm text-gray-600">{selectedUser.email}</p>
              </div>

              <div className="space-y-3 mb-6">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id={permission.id}
                      checked={pendingPermissions.includes(permission.id)}
                      onChange={() => handlePermissionToggle(permission.id)}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <label htmlFor={permission.id} className="font-medium text-gray-800 cursor-pointer">
                        {permission.label}
                      </label>
                      <p className="text-sm text-gray-600">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleSavePermissions}
                  disabled={showConfirmation}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  {showConfirmation ? (
                    <>
                      <CheckCircle size={16} className="mr-2" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>

              {showConfirmation && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle size={16} className="text-green-600 mr-2" />
                  <span className="text-green-800 text-sm">Permissões atualizadas com sucesso!</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <UserCog size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Selecione um usuário para editar suas permissões</p>
              <p className="text-sm text-gray-400 mt-2">
                {currentUserType === 'professor' 
                  ? 'Você pode gerenciar permissões de visitantes e alunos'
                  : 'Você pode gerenciar permissões de todos os usuários'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function getUserTypeLabel(type: string): string {
    const labels = {
      visitante: 'Visitante',
      'aluno-comum': 'Aluno',
      'aluno-nejusc': 'Aluno NEJUSC',
      professor: 'Professor',
      administrador: 'Administrador'
    };
    return labels[type as keyof typeof labels] || type;
  }

  function getUserTypeColor(type: string): string {
    const colors = {
      visitante: 'bg-gray-100 text-gray-800',
      'aluno-comum': 'bg-green-100 text-green-800',
      'aluno-nejusc': 'bg-emerald-100 text-emerald-800',
      professor: 'bg-blue-100 text-blue-800',
      administrador: 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  }
};

export default PermissionsManagement;