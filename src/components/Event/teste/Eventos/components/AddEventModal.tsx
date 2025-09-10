import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Event, Usuario } from '../types';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Omit<Event, 'id'>) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, onAddEvent }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    data: '',
    local: '',
    earea: '',
    duracao: '',
    gratuito: true,
    valor: 0,
    classificacaoIndicativa: 'Livre',
    categoria: 'em-breve' as const
  });

  const [palestrantes, setPalestrantes] = useState<Array<{ nome: string }>>([{ nome: '' }]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'valor') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePalestranteChange = (index: number, value: string) => {
    const newPalestrantes = [...palestrantes];
    newPalestrantes[index] = { nome: value };
    setPalestrantes(newPalestrantes);
  };

  const addPalestrante = () => {
    setPalestrantes([...palestrantes, { nome: '' }]);
  };

  const removePalestrante = (index: number) => {
    if (palestrantes.length > 1) {
      setPalestrantes(palestrantes.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const palestrantesData: Usuario[] = palestrantes
      .filter(p => p.nome.trim() !== '')
      .map((p, index) => ({
        id: `palestrante-${Date.now()}-${index}`,
        nome: p.nome.trim()
      }));

    const eventData: Omit<Event, 'id'> = {
      ...formData,
      palestrantes: palestrantesData
    };

    onAddEvent(eventData);
    onClose();
    
    // Reset form
    setFormData({
      titulo: '',
      descricao: '',
      data: '',
      local: '',
      earea: '',
      duracao: '',
      gratuito: true,
      valor: 0,
      classificacaoIndicativa: 'Livre',
      categoria: 'em-breve'
    });
    setPalestrantes([{ nome: '' }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Adicionar Novo Evento</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título do Evento *
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o título do evento"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição *
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Breve descrição do evento"
            />
          </div>

          {/* Data e Duração */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data e Hora *
              </label>
              <input
                type="datetime-local"
                name="data"
                value={formData.data}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duração
              </label>
              <input
                type="text"
                name="duracao"
                value={formData.duracao}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: 2 horas"
              />
            </div>
          </div>

          {/* Local e Área */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local *
              </label>
              <input
                type="text"
                name="local"
                value={formData.local}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Local do evento"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Área/Tema *
              </label>
              <select
                name="earea"
                value={formData.earea}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecione uma área</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Direito">Direito</option>
                <option value="Administração">Administração</option>
                <option value="Psicologia">Psicologia</option>
                <option value="Marketing">Marketing</option>
                <option value="Engenharia">Engenharia</option>
                <option value="Medicina">Medicina</option>
                <option value="Educação">Educação</option>
              </select>
            </div>
          </div>

          {/* Palestrantes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Palestrantes
              </label>
              <button
                type="button"
                onClick={addPalestrante}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </button>
            </div>
            
            <div className="space-y-2">
              {palestrantes.map((palestrante, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={palestrante.nome}
                    onChange={(e) => handlePalestranteChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Nome do palestrante ${index + 1}`}
                  />
                  {palestrantes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePalestrante(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Preço */}
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="gratuito"
                  checked={formData.gratuito}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Evento gratuito</span>
              </label>
            </div>
            
            {!formData.gratuito && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor (R$)
                </label>
                <input
                  type="number"
                  name="valor"
                  value={formData.valor}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
            )}
          </div>

          {/* Classificação e Categoria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classificação Indicativa
              </label>
              <select
                name="classificacaoIndicativa"
                value={formData.classificacaoIndicativa}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Livre">Livre</option>
                <option value="10 anos">10 anos</option>
                <option value="12 anos">12 anos</option>
                <option value="14 anos">14 anos</option>
                <option value="16 anos">16 anos</option>
                <option value="18 anos">18 anos</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="em-breve">Em breve</option>
                <option value="hoje">Hoje</option>
                <option value="em-andamento">Em andamento</option>
                <option value="ultimos-dias">Últimos dias</option>
              </select>
            </div>
          </div>

          {/* Botões */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Adicionar Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;