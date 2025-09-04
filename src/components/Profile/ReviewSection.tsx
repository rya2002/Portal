import React, { useState } from 'react';
import { 
  BookOpen, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MessageCircle,
  Calendar,
  User,
  FileText
} from 'lucide-react';

interface ReviewArticle {
  id: number;
  title: string;
  author: string;
  submissionDate: string;
  status: 'pendente' | 'em-revisao' | 'aprovado' | 'rejeitado';
  abstract: string;
  reviewComments?: string;
}

interface ReviewSectionProps {
  userType: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ userType }) => {
  const [selectedArticle, setSelectedArticle] = useState<ReviewArticle | null>(null);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewDecision, setReviewDecision] = useState<'aprovado' | 'rejeitado' | ''>('');

  const mockReviewArticles: ReviewArticle[] = [
    {
      id: 1,
      title: 'Impactos da Gentrificação em Salvador: Uma Análise Socioeconômica',
      author: 'Ana Oliveira',
      submissionDate: '15 de Janeiro de 2024',
      status: 'pendente',
      abstract: 'Este estudo analisa os processos de gentrificação em bairros históricos de Salvador, examinando os impactos socioeconômicos nas comunidades locais e propondo alternativas de desenvolvimento urbano mais inclusivas.'
    },
    {
      id: 2,
      title: 'Educação Popular e Movimentos Sociais na Bahia',
      author: 'Carlos Santos',
      submissionDate: '12 de Janeiro de 2024',
      status: 'em-revisao',
      abstract: 'Uma investigação sobre as práticas de educação popular desenvolvidas por movimentos sociais na Bahia, destacando metodologias inovadoras e seus impactos na formação política das comunidades.',
      reviewComments: 'Artigo interessante, mas precisa de mais fundamentação teórica na seção 2.'
    },
    {
      id: 3,
      title: 'Políticas de Cotas e Inclusão no Ensino Superior',
      author: 'Maria Fernanda',
      submissionDate: '8 de Janeiro de 2024',
      status: 'aprovado',
      abstract: 'Análise das políticas de cotas raciais e sociais implementadas nas universidades públicas baianas, avaliando seus resultados e desafios para a promoção da equidade no ensino superior.'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Clock size={16} className="text-yellow-500" />;
      case 'em-revisao':
        return <Eye size={16} className="text-blue-500" />;
      case 'aprovado':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'rejeitado':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pendente: 'bg-yellow-100 text-yellow-800',
      'em-revisao': 'bg-blue-100 text-blue-800',
      aprovado: 'bg-green-100 text-green-800',
      rejeitado: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pendente: 'Pendente',
      'em-revisao': 'Em Revisão',
      aprovado: 'Aprovado',
      rejeitado: 'Rejeitado'
    };
    return labels[status as keyof typeof labels];
  };

  const handleStartReview = (article: ReviewArticle) => {
    setSelectedArticle(article);
    setReviewComment(article.reviewComments || '');
    setReviewDecision('');
  };

  const handleSubmitReview = () => {
    if (selectedArticle && reviewDecision) {
      // Aqui seria feita a chamada para a API
      console.log('Submitting review:', {
        articleId: selectedArticle.id,
        decision: reviewDecision,
        comments: reviewComment
      });
      
      // Simular atualização
      selectedArticle.status = reviewDecision;
      selectedArticle.reviewComments = reviewComment;
      
      setSelectedArticle(null);
      setReviewComment('');
      setReviewDecision('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <BookOpen className="mr-3" size={24} />
        Revisões de Artigos
      </h2>

      {selectedArticle ? (
        // Interface de revisão detalhada
        <div className="space-y-6">
          <div className="border-b pb-4">
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-blue-600 hover:text-blue-800 mb-4"
            >
              ← Voltar à lista
            </button>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{selectedArticle.title}</h3>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <User size={14} className="mr-1" />
                {selectedArticle.author}
              </div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {selectedArticle.submissionDate}
              </div>
              <div className="flex items-center">
                {getStatusIcon(selectedArticle.status)}
                <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedArticle.status)}`}>
                  {getStatusLabel(selectedArticle.status)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Resumo</h4>
            <p className="text-gray-700 leading-relaxed">{selectedArticle.abstract}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Comentários da Revisão</h4>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Adicione seus comentários sobre o artigo..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
            />
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Decisão</h4>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="decision"
                  value="aprovado"
                  checked={reviewDecision === 'aprovado'}
                  onChange={(e) => setReviewDecision(e.target.value as 'aprovado')}
                  className="mr-2"
                />
                <CheckCircle size={16} className="text-green-500 mr-1" />
                Aprovar
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="decision"
                  value="rejeitado"
                  checked={reviewDecision === 'rejeitado'}
                  onChange={(e) => setReviewDecision(e.target.value as 'rejeitado')}
                  className="mr-2"
                />
                <XCircle size={16} className="text-red-500 mr-1" />
                Rejeitar
              </label>
            </div>
          </div>

          <div className="flex space-x-3 pt-4 border-t">
            <button
              onClick={handleSubmitReview}
              disabled={!reviewDecision}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submeter Revisão
            </button>
            <button
              onClick={() => setSelectedArticle(null)}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        // Lista de artigos para revisão
        <div className="space-y-4">
          {mockReviewArticles.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Nenhum artigo pendente de revisão.</p>
            </div>
          ) : (
            mockReviewArticles.map((article) => (
              <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">{article.title}</h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <User size={14} className="mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {article.submissionDate}
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(article.status)}
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                          {getStatusLabel(article.status)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm line-clamp-2">{article.abstract}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  {article.reviewComments && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MessageCircle size={14} className="mr-1" />
                      Comentários disponíveis
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStartReview(article)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center"
                    >
                      <Eye size={14} className="mr-1" />
                      {article.status === 'pendente' ? 'Iniciar Revisão' : 'Ver Revisão'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;