import React, { useState } from 'react';
import { Plus, Upload, Users, FileText, BookOpen, BarChart } from 'lucide-react';

export default function ConfiguracaoView() {
  const [activeSection, setActiveSection] = useState('publicacoes');

  const sections = [
    { id: 'publicacoes', label: 'Publicações', icon: Plus },
    { id: 'submissoes', label: 'Submissões', icon: Upload },
    { id: 'usuarios', label: 'Usuários', icon: Users },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 dark:bg-gray-700 rounded-l-lg">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Configurações
              </h2>
              <nav className="space-y-2">
                {sections.map(section => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-8">
            {activeSection === 'publicacoes' && <PublicacoesSection />}
            {activeSection === 'submissoes' && <SubmissoesSection />}
            {activeSection === 'usuarios' && <UsuariosSection />}
            {activeSection === 'relatorios' && <RelatoriosSection />}
          </div>
        </div>
      </div>
    </div>
  );
}

function PublicacoesSection() {
  const [tipoPublicacao, setTipoPublicacao] = useState('artigo');

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Nova Publicação
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Adicione novos artigos e revistas ao acervo do NEJUSC
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tipo de Publicação
        </label>
        <div className="flex space-x-4">
          <button
            onClick={() => setTipoPublicacao('artigo')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
              tipoPublicacao === 'artigo'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Artigo</span>
          </button>
          <button
            onClick={() => setTipoPublicacao('revista')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
              tipoPublicacao === 'revista'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Revista</span>
          </button>
        </div>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Título *
          </label>
          <input
            type="text"
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Digite o título da publicação"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Autores *
          </label>
          <input
            type="text"
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Digite os autores separados por vírgula"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Área *
            </label>
            <select
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Selecione uma área</option>
              <option value="Direitos Humanos">Direitos Humanos</option>
              <option value="Movimentos Sociais">Movimentos Sociais</option>
              <option value="Acesso à Justiça">Acesso à Justiça</option>
              <option value="Educação">Educação</option>
              <option value="Igualdade de Gênero">Igualdade de Gênero</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Data de Publicação *
            </label>
            <input
              type="date"
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {tipoPublicacao === 'revista' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Edição
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Volume X, Nº Y"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resumo/Descrição *
          </label>
          <textarea
            required
            rows={4}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Digite uma descrição detalhada da publicação"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Palavras-chave *
          </label>
          <input
            type="text"
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Digite as palavras-chave separadas por vírgula"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload do PDF *
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Clique para fazer upload ou arraste o arquivo aqui
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PDF até 10MB
            </p>
            <input type="file" accept=".pdf" className="hidden" />
          </div>
        </div>

        {tipoPublicacao === 'revista' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Capa da Revista
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Upload da imagem da capa
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                JPG, PNG até 2MB
              </p>
              <input type="file" accept="image/*" className="hidden" />
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
}

function SubmissoesSection() {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Submissões Pendentes
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Gerencie as submissões dos alunos do NEJUSC
        </p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Nenhuma submissão pendente
        </h4>
        <p className="text-gray-600 dark:text-gray-400">
          Quando alunos enviarem trabalhos para revisão, eles aparecerão aqui.
        </p>
      </div>
    </div>
  );
}

function UsuariosSection() {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Gerenciamento de Usuários
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Controle o acesso e permissões dos membros do NEJUSC
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
        <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Funcionalidade em desenvolvimento
        </h4>
        <p className="text-gray-600 dark:text-gray-400">
          O sistema de gerenciamento de usuários estará disponível em breve.
        </p>
      </div>
    </div>
  );
}

function RelatoriosSection() {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Relatórios de Produção Acadêmica
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Visualize estatísticas e gere relatórios sobre as publicações
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Relatório Mensal
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Publicações do último mês
          </p>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Gerar Relatório
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Relatório Anual
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Resumo completo do ano
          </p>
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
            Gerar Relatório
          </button>
        </div>
      </div>
    </div>
  );
}