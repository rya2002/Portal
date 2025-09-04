import React from 'react';
import { Users, BarChart3, Settings, Shield, FileText, Eye, Edit, Trash2 } from 'lucide-react';

interface AdminSectionProps {
  section: string;
}

const AdminSection: React.FC<AdminSectionProps> = ({ section }) => {
  const renderAnalytics = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <BarChart3 className="mr-3" size={24} />
        Analytics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Users className="text-blue-600 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Total de Usuários</p>
              <p className="text-2xl font-bold text-gray-800">1,247</p>
              <p className="text-xs text-green-600">+12% este mês</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <FileText className="text-green-600 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Artigos Publicados</p>
              <p className="text-2xl font-bold text-gray-800">342</p>
              <p className="text-xs text-green-600">+8% este mês</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Eye className="text-purple-600 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Visualizações Totais</p>
              <p className="text-2xl font-bold text-gray-800">45,621</p>
              <p className="text-xs text-green-600">+15% este mês</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center">
            <BarChart3 className="text-yellow-600 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Engajamento</p>
              <p className="text-2xl font-bold text-gray-800">87%</p>
              <p className="text-xs text-green-600">+5% este mês</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Artigos Mais Visualizados</h3>
          <div className="space-y-3">
            {[
              { title: 'Justiça Social e Direitos Humanos', views: 2341 },
              { title: 'Movimentos Sociais em Salvador', views: 1876 },
              { title: 'Educação Popular na Bahia', views: 1654 }
            ].map((article, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white rounded border">
                <span className="text-sm font-medium">{article.title}</span>
                <span className="text-sm text-gray-600">{article.views} views</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Relatórios Disponíveis</h3>
          <div className="space-y-2">
            <button className="w-full text-left p-3 bg-white rounded border hover:shadow-md transition-shadow">
              Relatório de Usuários Ativos
            </button>
            <button className="w-full text-left p-3 bg-white rounded border hover:shadow-md transition-shadow">
              Relatório de Artigos Mais Visualizados
            </button>
            <button className="w-full text-left p-3 bg-white rounded border hover:shadow-md transition-shadow">
              Relatório de Engajamento
            </button>
            <button className="w-full text-left p-3 bg-white rounded border hover:shadow-md transition-shadow">
              Relatório de Moderação
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfigurations = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Settings className="mr-3" size={24} />
        Configurações do Sistema
      </h2>
      
      <div className="space-y-6">
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="mr-2" size={20} />
            Configurações de Segurança
          </h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span>Autenticação de dois fatores obrigatória</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span>Verificação de email para novos usuários</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Moderação automática de comentários</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span>Aprovação manual para alunos NEJUSC</span>
            </label>
          </div>
        </div>
        
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Settings className="mr-2" size={20} />
            Configurações Gerais
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Instituição
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue="NEJUSC – Núcleo de Estudos em Justiça Social"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email de Contato
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue="contato@nejusc.unijorge.edu.br"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Limite de Artigos por Usuário (mensal)
              </label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue="5"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Manutenção</h3>
          <div className="flex flex-wrap gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Backup do Sistema
            </button>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
              Limpar Cache
            </button>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Reindexar Busca
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Modo Manutenção
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FileText className="mr-3" size={24} />
        Gerenciar Conteúdo
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Artigos Recentes</h3>
          <div className="space-y-3">
            {[
              { title: 'Justiça Social e Direitos Humanos na Era Digital', author: 'Dr. Maria Santos', status: 'publicado' },
              { title: 'Análise Crítica das Políticas Públicas em Salvador', author: 'Ana Oliveira', status: 'em-revisao' },
              { title: 'Movimentos Sociais e Transformação Urbana', author: 'Dr. Maria Santos', status: 'publicado' }
            ].map((article, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{article.title}</h4>
                  <p className="text-sm text-gray-600">Por: {article.author}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    article.status === 'publicado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {article.status === 'publicado' ? 'Publicado' : 'Em Revisão'}
                  </span>
                  <button className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="Editar">
                    <Edit size={14} />
                  </button>
                  <button className="p-1 text-red-600 hover:bg-red-50 rounded" title="Remover">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Postagens do Blog</h3>
          <div className="space-y-3">
            {[
              { title: 'Reflexões sobre o Futuro da Justiça Social', author: 'Dr. Maria Santos', comments: 12 },
              { title: 'O Papel da Universidade na Transformação Social', author: 'Ana Oliveira', comments: 8 }
            ].map((post, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{post.title}</h4>
                  <p className="text-sm text-gray-600">Por: {post.author} • {post.comments} comentários</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="Editar">
                    <Edit size={14} />
                  </button>
                  <button className="p-1 text-red-600 hover:bg-red-50 rounded" title="Remover">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderModeration = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Shield className="mr-3" size={24} />
        Moderação
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Comentários Pendentes</h3>
          <div className="space-y-3">
            {[
              {
                content: 'Este artigo apresenta uma perspectiva muito interessante sobre justiça social, mas acredito que faltou abordar os aspectos econômicos...',
                author: 'João Silva',
                article: 'Justiça Social e Direitos Humanos',
                date: '20/01/2024'
              },
              {
                content: 'Concordo plenamente com a análise. Seria interessante ver mais estudos empíricos na região nordeste.',
                author: 'Maria Fernanda',
                article: 'Movimentos Sociais em Salvador',
                date: '19/01/2024'
              }
            ].map((comment, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700 mb-3">"{comment.content}"</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">{comment.author}</span> em "{comment.article}"
                    <span className="block sm:inline sm:ml-2">{comment.date}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                      Aprovar
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                      Rejeitar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Usuários Relatados</h3>
          <div className="space-y-3">
            {[
              { name: 'Roberto Mendes', email: 'roberto@exemplo.com', reason: 'Spam em comentários', reports: 3 },
              { name: 'Carlos Lima', email: 'carlos@exemplo.com', reason: 'Conteúdo inadequado', reports: 1 }
            ].map((report, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="font-medium text-gray-800">{report.name}</p>
                    <p className="text-sm text-gray-600">{report.email}</p>
                    <p className="text-sm text-red-600">Motivo: {report.reason} ({report.reports} denúncias)</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition-colors">
                      Investigar
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                      Suspender
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <h4 className="font-medium text-gray-800">Aprovar Todos Pendentes</h4>
              <p className="text-sm text-gray-600">12 comentários pendentes</p>
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <h4 className="font-medium text-gray-800">Limpar Spam</h4>
              <p className="text-sm text-gray-600">5 comentários marcados</p>
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <h4 className="font-medium text-gray-800">Revisar Denúncias</h4>
              <p className="text-sm text-gray-600">3 denúncias ativas</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  switch (section) {
    case 'analytics':
      return renderAnalytics();
    case 'configuracoes':
      return renderConfigurations();
    case 'moderacao':
      return renderModeration();
    case 'gerenciar-conteudo':
      return renderContentManagement();
    default:
      return null;
  }
};

export default AdminSection;