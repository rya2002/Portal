import React from 'react';
import { ExternalLink, Eye, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  date: string;
  link: string;
  views?: number;
  status?: 'publicado' | 'em-revisao' | 'rejeitado';
  accessDate?: string;
}

interface ArticlesListProps {
  articles: Article[];
  type: 'published' | 'accessed';
  userType: string;
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles, type, userType }) => {
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'publicado':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'em-revisao':
        return <Clock size={16} className="text-yellow-500" />;
      case 'rejeitado':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status?: string) => {
    const labels = {
      publicado: 'Publicado',
      'em-revisao': 'Em Revisão',
      rejeitado: 'Rejeitado'
    };
    return status ? labels[status as keyof typeof labels] : '';
  };

  const getStatusColor = (status?: string) => {
    const colors = {
      publicado: 'bg-green-100 text-green-800',
      'em-revisao': 'bg-yellow-100 text-yellow-800',
      rejeitado: 'bg-red-100 text-red-800'
    };
    return status ? colors[status as keyof typeof colors] : '';
  };

  const title = type === 'published' ? 'Artigos Publicados' : 'Artigos Acessados';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      
      {articles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum artigo encontrado.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{article.title}</h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {type === 'published' ? article.date : `Acessado em ${article.accessDate}`}
                    </div>
                    
                    {type === 'published' && article.views !== undefined && (
                      <div className="flex items-center">
                        <Eye size={14} className="mr-1" />
                        {article.views} visualizações
                      </div>
                    )}
                    
                    {type === 'published' && article.status && (
                      <div className="flex items-center">
                        {getStatusIcon(article.status)}
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                          {getStatusLabel(article.status)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors duration-200"
                  title="Abrir artigo"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesList;