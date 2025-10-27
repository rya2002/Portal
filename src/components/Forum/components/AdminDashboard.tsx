import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useForum } from '../hooks/useForum';
import {
  FileText,
  MessageSquare,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Users,
} from 'lucide-react';

export function AdminDashboard() {
  const { user } = useAuth();
  const { posts, atualizarPostagem, carregarPostagens, loading } = useForum();
  const [activeSection, setActiveSection] = useState<'overview' | 'publications'>('overview');

  const allowedRoles = ['admin', 'professor'];

  if (!allowedRoles.includes(user?.role || '')) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">Acesso Negado</h3>
        <p className="text-red-700">Você não tem permissão para acessar o painel administrativo.</p>
      </div>
    );
  }

  useEffect(() => {
    carregarPostagens();
  }, [carregarPostagens]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'text-yellow-600 bg-yellow-100';
      case 'Aprovado':
        return 'text-green-600 bg-green-100';
      case 'Rejeitado':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pendente':
        return Clock;
      case 'Aprovado':
        return CheckCircle;
      case 'Rejeitado':
        return XCircle;
      default:
        return Clock;
    }
  };

  const stats = [
    { label: 'Usuários Ativos', value: '24', icon: Users, color: 'blue' },
    { label: 'Postagens Hoje', value: '8', icon: MessageSquare, color: 'green' },
    {
      label: 'Postagens Pendentes',
      value: posts.filter((p) => p.status === 'Pendente').length.toString(),
      icon: FileText,
      color: 'yellow',
    },
    {
      label: 'Postagens Aprovadas',
      value: posts.filter((p) => p.status === 'Aprovado').length.toString(),
      icon: Shield,
      color: 'purple',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Painel Administrativo</h2>
      </div>

      {/* Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'publications', label: 'Gerenciar Postagens' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSection === item.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                >
                  <div className="flex items-center">
                    <div className={`bg-${stat.color}-100 rounded-full p-3`}>
                      <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Publications */}
      {activeSection === 'publications' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Gerenciar Postagens</h3>
          {loading ? (
            <p>Carregando postagens...</p>
          ) : (
            posts.map((post) => {
              const StatusIcon = getStatusIcon(post.status);
              return (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {post.titulo}
                      </h4>
                      <p className="text-gray-700 mb-3">{post.conteudo}</p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Por: {post.autor}</span>
                        <span>
                          Publicado em:{' '}
                          {new Date(post.dataPublicacao).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          post.status
                        )}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        <span>{post.status}</span>
                      </span>
                    </div>
                  </div>

                  {post.status === 'Pendente' && (
                    <div className="flex space-x-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => atualizarPostagem(post.id, { status: 'Aprovado' })}
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Aprovar</span>
                      </button>
                      <button
                        onClick={() => atualizarPostagem(post.id, { status: 'Rejeitado' })}
                        className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Rejeitar</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
