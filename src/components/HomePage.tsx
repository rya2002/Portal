import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  BookOpen,
  Bot,
  MicVocal,
  ArrowRight,
  Book,
  Download,
  ArrowUp,
} from 'lucide-react';
import Footer from './Footer';
import capaRevista from '../assets/capas/EntreARampaEOAbismo.png';
import revistaPDF from '../assets/revistas/Entre a rempa e o abismo-1.pdf';

export default function HomePage() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowScrollTop(scrollY > windowHeight * 0.6);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 🆕 Baixar o PDF local
  const handleDownloadRevista = () => {
    const link = document.createElement('a');
    link.href = revistaPDF;
    link.download = 'Revista_Direitos_e_Vulnerabilidades.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full scroll-smooth bg-white relative">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-center">
          Bem-vindo ao
          <span className="text-blue-600 block">Portal NEJUSC</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl text-center">
          "Mais que leis, precisamos mudar mentes e corações." - Pablo Stolze
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollTo('linha')}
            className="flex items-center space-x-2 bg-blue-600 text-white px-12 py-5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg justify-center"
          >
            <Book className="w-6 h-6" />
            <span>Linha de estudo principal</span>
            <ArrowRight className="w-6 h-6" />
          </button>

          <button
            onClick={() => scrollTo('sobre')}
            className="flex items-center space-x-2 bg-blue-600 text-white px-12 py-5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg justify-center"
          >
            <MessageSquare className="w-6 h-6" />
            <span>Sobre nós</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Linha de Trabalho Principal */}
      <section
        id="linha"
        className="h-screen flex items-center justify-center bg-white px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Linha de estudo principal
          </h2>
          <p className="text-gray-700 mb-6">
            Nosso carro-chefe são os estudos em{' '}
            <strong>Direitos e Vulnerabilidades</strong>, baseados nas
            publicações do NEJUSC. Essa linha busca compreender os desafios
            sociais e jurídicos enfrentados por grupos vulneráveis na sociedade
            contemporânea.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownloadRevista}
              className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <Download className="h-5 w-5 mr-2" /> Baixar Revista
            </button>
            <Link
              to="/biblioteca"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Checar outras revistas
            </Link>
          </div>

          <div className="mt-8 flex justify-center">
            <img
              src={capaRevista}
              alt="Capa da Revista Direitos e Vulnerabilidades"
              className="w-48 h-64 object-cover shadow-lg rounded"
            />
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section
        id="sobre"
        className="h-screen flex flex-col items-center justify-center bg-gray-100 px-6"
      >
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre nós</h2>
          <p className="text-gray-700 mb-6">
            O Núcleo de Estudos em Justiça Social – NEJUSC foi criado em 2024 a
            partir da disciplina História e Socioantropologia do Direito, sob
            orientação da Professora Dra. Maria de Fátima Cardoso, no Centro
            Universitário Jorge Amado – UNIJORGE.
          </p>
          <Link
            to="/equipe"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Conheça a equipe
          </Link>
        </div>

        {/* Features Section */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center px-4">
          <Link
            to="/biblioteca"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition block"
          >
            <BookOpen className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Biblioteca</h3>
            <p className="text-gray-600">
              Acesse materiais acadêmicos, artigos e revistas produzidas pelo
              NEJUSC.
            </p>
          </Link>

          <Link
            to="/chat"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition block"
          >
            <Bot className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Assistente</h3>
            <p className="text-gray-600">
              Acesse nosso assistente virtual para saber mais sobre as linhas de
              estudo.
            </p>
          </Link>

          <Link
            to="/forum"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition block"
          >
            <MessageSquare className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Discussões</h3>
            <p className="text-gray-600">
              Participe de fóruns e debata temas relevantes com colegas e
              especialistas.
            </p>
          </Link>

          <Link
            to="/eventos"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition block"
          >
            <MicVocal className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Eventos</h3>
            <p className="text-gray-600">
              Fique por dentro das atividades do Núcleo.
            </p>
          </Link>
        </div>
      </section>

      <Footer />

      {/* 🔹 Botão Flutuante de Voltar ao Topo */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
