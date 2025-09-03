import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle
} from 'lucide-react';
import { PublicationRequest } from '../types/auth';

const mockRequests: PublicationRequest[] = [
  {
    id: '1',
    title: 'Inteligência Artificial na Educação: Perspectivas e Desafios',
    description: 'Artigo sobre a implementação de IA em ambientes educacionais e seus impactos na aprendizagem.',
    studentName: 'João Silva',
    studentEmail: 'joao@student.com',
    submittedAt: '2024-01-15T09:00:00Z',
    status: 'pending',
    category: 'Tecnologia'
  },
  {
    id: '2',
    title: 'Sustentabilidade em Projetos de Software',
    description: 'Análise das práticas sustentáveis no desenvolvimento de software e seu impacto ambiental.',
    studentName: 'Ana Costa',
    studentEmail: 'ana@student.com',
    submittedAt: '2024-01-14T14:30:00Z',
    status: 'approved',
    category: 'Meio Ambiente'
  }
];

export function AdminDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<PublicationRequest[]>(mockRequests);
  const [activeSection, setActiveSection] = useState('overview');

  if (user?.role !== 'admin') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">Acesso Negado</h3>
        <p className="text-red-700">Você não tem permissão para acessar o painel administrativo.</p>
      </div>
    );
  }

  const handleRequestAction = (requestId: string, action: 'approved' | 'rejected') => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: action } : req
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'approved': return CheckCircle;
      case 'rejected': return XCircle;
      default: return Clock;
    }
  };

  const stats = [
    { label: 'Usuários Ativos', value: '24', icon: Users, color: 'blue' },
    { label: 'Postagens Hoje', value: '8', icon: MessageSquare, color: 'green' },
    { label: 'Solicitações Pendentes', value: requests.filter(r => r.status === 'pending').length.toString(), icon: FileText, color: 'yellow' },
    { label: 'Publicações Aprovadas', value: requests.filter(r => r.status === 'approved').length.toString(), icon: Shield, color: 'purple' }
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
            { id: 'publications', label: 'Solicitações de Publicação' },
            { id: 'users', label: 'Gerenciar Usuários' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
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

      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
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

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Atividades Recentes</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">Nova publicação aprovada por Maria Santos</span>
                  <span className="text-xs text-gray-500">há 2 horas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700">3 novos usuários se cadastraram</span>
                  <span className="text-xs text-gray-500">há 4 horas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 rounded-full p-2">
                    <FileText className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-sm text-gray-700">Nova solicitação de publicação recebida</span>
                  <span className="text-xs text-gray-500">há 6 horas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'publications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Solicitações de Publicação</h3>
          </div>

          <div className="space-y-4">
            {requests.map((request) => {
              const StatusIcon = getStatusIcon(request.status);
              return (
                <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{request.title}</h4>
                      <p className="text-gray-700 mb-3">{request.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Por: {request.studentName}</span>
                        <span>Email: {request.studentEmail}</span>
                        <span>Categoria: {request.category}</span>
                        <span>
                          Enviado em: {new Date(request.submittedAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>
                          {request.status === 'pending' && 'Pendente'}
                          {request.status === 'approved' && 'Aprovado'}
                          {request.status === 'rejected' && 'Rejeitado'}
                        </span>
                      </span>
                    </div>
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex space-x-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleRequestAction(request.id, 'approved')}
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Aprovar</span>
                      </button>
                      <button
                        onClick={() => handleRequestAction(request.id, 'rejected')}
                        className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Rejeitar</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSection === 'users' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gerenciar Usuários</h3>
          <p className="text-gray-600">
            Funcionalidade de gerenciamento de usuários será implementada em breve.
          </p>
        </div>
      )}
    </div>
  );
}