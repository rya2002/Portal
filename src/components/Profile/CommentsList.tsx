import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

interface Comment {
  id: number;
  content: string;
  date: string;
  relatedTitle: string;
  relatedLink: string;
}

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Comentários</h2>
      
      {comments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum comentário encontrado.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <p className="text-gray-700 mb-3">{comment.content}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {comment.date}
                </div>
                
                <div className="flex items-center">
                  <span className="mr-2">Em:</span>
                  <a
                    href={comment.relatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    {comment.relatedTitle}
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;