import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Heart, MessageCircle, Clock, User } from "lucide-react";
import { getAllPostagens } from "../services/forumService";

interface Comentario {
  id: string;
  content: string;
  author: string;
  authorRole: string;
  createdAt: string;
  likes: number;
}

interface Postagem {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  createdAt: string;
  likes: number;
  comments: Comentario[];
  category: string;
}

export function ForumDiscussions() {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Postagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const canInteract = isAuthenticated && user?.userType !== "visitante";

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getAllPostagens();
        console.log("📬 Postagens recebidas da API:", data);
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar postagens do fórum");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-purple-600";
      case "student":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "🛠️ Admin";
      case "student":
        return "🎓 Aluno";
      default:
        return "👤 Visitante";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <p className="text-gray-500">Carregando postagens...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Discussões do Fórum</h2>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-600">Nenhuma postagem encontrada.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                      {post.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span className={getRoleColor(post.authorRole)}>
                        {getRoleLabel(post.authorRole)}
                      </span>
                      <span>{post.author}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                  {post.category}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{post.content}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-6">
                  <button
                    disabled={!canInteract}
                    className={`flex items-center space-x-2 ${
                      canInteract
                        ? "text-gray-600 hover:text-red-600"
                        : "text-gray-400 cursor-not-allowed"
                    } transition-colors`}
                  >
                    <Heart className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    disabled={!canInteract}
                    className={`flex items-center space-x-2 ${
                      canInteract
                        ? "text-gray-600 hover:text-blue-600"
                        : "text-gray-400 cursor-not-allowed"
                    } transition-colors`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments?.length || 0} comentários</span>
                  </button>
                </div>

                {canInteract && (
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Responder
                  </button>
                )}
              </div>

              {post.comments?.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="space-y-3">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <span
                              className={`font-medium ${getRoleColor(
                                comment.authorRole
                              )}`}
                            >
                              {getRoleLabel(comment.authorRole)} {comment.author}
                            </span>
                            <span className="text-gray-500">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          {canInteract && (
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600">
                              <Heart className="w-4 h-4" />
                              <span>{comment.likes}</span>
                            </button>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
