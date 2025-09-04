import React from 'react';
import { Calendar, MessageCircle } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  comments: number;
}

interface PostsListProps {
  posts: Post[];
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Postagens</h2>
      
      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhuma postagem encontrada.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-medium text-gray-800 mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-3 line-clamp-3">{post.excerpt}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {post.date}
                </div>
                
                <div className="flex items-center">
                  <MessageCircle size={14} className="mr-1" />
                  {post.comments} comentários
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsList;