import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Users, BookOpen, Award, ArrowRight, Book } from 'lucide-react';
import Header from "../components/Header";
import Footer from './Footer';

export default function HomePage() {
    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bem-vindo ao
            <span className="text-blue-600 block">Portal NEJUSC</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Conecte-se com a comunidade acadêmica, participe de discussões enriquecedoras 
            e compartilhe conhecimento em nossa plataforma educacional.
          </p>

        <div className="flex flex-col items-center justify-center space-y-4 mb-16">
          <Link
            to="/biblioteca"
            className="flex items-center space-x-2 bg-blue-600 text-white px-12 py-5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg w-full sm:w-[420px] justify-center"
          >
          <Book className="w-6 h-6" />
            <span>Biblioteca</span>
            <ArrowRight className="w-6 h-6" />
          </Link>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
          <Link
          to="/forum"
          className="flex items-center space-x-2 bg-blue-600 text-white px-12 py-5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg w-full sm:w-[420px] justify-center"
          >
          <MessageSquare className="w-6 h-6" />
          <span>Acessar Fórum</span>
          <ArrowRight className="w-6 h-6" />
          </Link>
  </div>
</div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comunidade Ativa</h3>
              <p className="text-gray-600">
                Conecte-se com estudantes, professores e profissionais em discussões enriquecedoras.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Publicações Acadêmicas</h3>
              <p className="text-gray-600">
                Compartilhe seus trabalhos e pesquisas com a comunidade acadêmica.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Reconhecimento</h3>
              <p className="text-gray-600">
                Ganhe reconhecimento por suas contribuições e participação ativa na comunidade.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}