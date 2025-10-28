import React, { useState } from 'react';
import { Plus, Upload, Users, FileText, BookOpen, BarChart } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';
import api from '../../../../services/api';
import { toast } from 'react-toastify';

export default function ConfiguracaoView() {
  const [activeSection, setActiveSection] = useState<'publicacoes' | 'submissoes' | 'usuarios' | 'relatorios'>('publicacoes');
  const { user } = useAuth() as any; // ajuste a tipagem se tiver um tipo de usuário compartilhado

  // Checagem de permissão: aceita tanto role (ex.: "Professor") quanto userType (ex.: "professor")
  const isAllowed = !!user && (['professor', 'administrador'].includes(String(user.userType || '').toLowerCase()) ||
                              ['professor', 'administrador'].includes(String(user.role || '').toLowerCase()));

  if (!isAllowed) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold mb-2">Acesso restrito</h2>
        <p className="text-gray-600">Você não tem permissão para acessar as configurações.</p>
      </div>
    );
  }

  const sections = [
    { id: 'publicacoes', label: 'Publicações', icon: Plus },
    { id: 'submissoes', label: 'Submissões', icon: Upload },
    { id: 'usuarios', label: 'Usuários', icon: Users },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 rounded-l-lg">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Configurações</h2>
              <nav className="space-y-2">
                {sections.map(section => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id as any)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
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

          {/* Conteúdo */}
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

/* -----------------------------
   Seção: Publicações
   - faz upload via `api` (comCredentials)
   - não depende de token no contexto
   ------------------------------ */
function PublicacoesSection() {
  const [tipoPublicacao, setTipoPublicacao] = useState<'artigo' | 'revista'>('artigo');
  const [titulo, setTitulo] = useState('');
  const [autores, setAutores] = useState('');
  const [area, setArea] = useState('');
  const [publicacao, setPublicacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [palavrasChave, setPalavrasChave] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [capaFile, setCapaFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !autores || !area || !publicacao || !descricao || !palavrasChave || !pdfFile) {
      toast.error('Preencha todos os campos obrigatórios e anexe o PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('autores', autores); // backend deve aceitar lista ou string separada
    formData.append('area', area);
    formData.append('publicacao', publicacao);
    formData.append('descricao', descricao);
    formData.append('palavrasChave', palavrasChave);
    formData.append('tipo', tipoPublicacao);
    formData.append('pdf', pdfFile);
    if (tipoPublicacao === 'revista' && capaFile) formData.append('capa', capaFile);

    try {
      setLoading(true);
      await api.post('/publicacao', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Publicação enviada com sucesso.');
      // limpar campos
      setTitulo('');
      setAutores('');
      setArea('');
      setPublicacao('');
      setDescricao('');
      setPalavrasChave('');
      setPdfFile(null);
      setCapaFile(null);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao enviar publicação.');
    } finally {
      setLoading(false);
    }

  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Nova Publicação</h3>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setTipoPublicacao('artigo')}
          className={`px-4 py-2 rounded-lg border ${tipoPublicacao === 'artigo' ? 'border-blue-500 text-blue-600' : 'border-gray-300'}`}
        >
          <FileText className="inline-block mr-2 h-4 w-4" /> Artigo
        </button>

        <button
          type="button"
          onClick={() => setTipoPublicacao('revista')}
          className={`px-4 py-2 rounded-lg border ${tipoPublicacao === 'revista' ? 'border-blue-500 text-blue-600' : 'border-gray-300'}`}
        >
          <BookOpen className="inline-block mr-2 h-4 w-4" /> Revista
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título *" className="w-full p-3 border rounded-lg" />
        <input value={autores} onChange={e => setAutores(e.target.value)} placeholder="Autores (separe por vírgula) *" className="w-full p-3 border rounded-lg" />
        <input value={area} onChange={e => setArea(e.target.value)} placeholder="Área *" className="w-full p-3 border rounded-lg" />
        <input type="date" value={publicacao} onChange={e => setPublicacao(e.target.value)} className="w-full p-3 border rounded-lg" />
        <textarea value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Resumo *" rows={4} className="w-full p-3 border rounded-lg" />
        <input value={palavrasChave} onChange={e => setPalavrasChave(e.target.value)} placeholder="Palavras-chave (separe por vírgula) *" className="w-full p-3 border rounded-lg" />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload do PDF *</label>
          <input type="file" accept=".pdf" onChange={e => setPdfFile(e.target.files?.[0] || null)} />
        </div>

        {tipoPublicacao === 'revista' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capa da Revista</label>
            <input type="file" accept="image/*" onChange={e => setCapaFile(e.target.files?.[0] || null)} />
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <button type="button" onClick={() => {
            setTitulo(''); setAutores(''); setArea(''); setPublicacao(''); setDescricao(''); setPalavrasChave(''); setPdfFile(null); setCapaFile(null);
          }} className="px-4 py-2 border rounded">Cancelar</button>

          <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {loading ? 'Enviando...' : 'Publicar'}
          </button>
        </div>
      </form>
    </div>
  );
}

/* -----------------------------
   Seção: Submissões (placeholder)
   ------------------------------ */
function SubmissoesSection() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Submissões Pendentes</h3>
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h4 className="text-lg font-medium mb-2">Nenhuma submissão pendente</h4>
        <p className="text-gray-600">Quando alunos enviarem trabalhos para revisão, eles aparecerão aqui.</p>
      </div>
    </div>
  );
}

/* -----------------------------
   Seção: Usuários (placeholder)
   ------------------------------ */
function UsuariosSection() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Gerenciamento de Usuários</h3>
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h4 className="text-lg font-medium mb-2">Funcionalidade em desenvolvimento</h4>
        <p className="text-gray-600">O sistema de gerenciamento de usuários estará disponível em breve.</p>
      </div>
    </div>
  );
}

/* -----------------------------
   Seção: Relatórios (placeholder)
   ------------------------------ */
function RelatoriosSection() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Relatórios de Produção Acadêmica</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <h4 className="font-medium mb-2">Relatório Mensal</h4>
          <p className="text-sm text-gray-600 mb-4">Publicações do último mês</p>
          <button className="w-full bg-blue-600 text-white py-2 rounded">Gerar Relatório</button>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <h4 className="font-medium mb-2">Relatório Anual</h4>
          <p className="text-sm text-gray-600 mb-4">Resumo completo do ano</p>
          <button className="w-full bg-green-600 text-white py-2 rounded">Gerar Relatório</button>
        </div>
      </div>
    </div>
  );
}
