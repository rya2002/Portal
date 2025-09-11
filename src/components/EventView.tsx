import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import EventCarousel from './Event/teste/Eventos/components/EventCarousel';
import AddEventModal from './Event/teste/Eventos/components/AddEventModal';
import { Event } from './Event/teste/Eventos/types';
import { mockEvents } from './Event/teste/Eventos/data/mockEvents';
import { useAuth } from '../contexts/AuthContext';

function EventView() {
  const { user } = useAuth(); 
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [activeCategory, setActiveCategory] = useState('em-andamento');
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

  // Busca de eventos
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredEvents(events);
      return;
    }

    const filtered = events.filter(event =>
      event.titulo.toLowerCase().includes(query.toLowerCase()) ||
      event.descricao.toLowerCase().includes(query.toLowerCase()) ||
      event.earea.toLowerCase().includes(query.toLowerCase()) ||
      event.local.toLowerCase().includes(query.toLowerCase()) ||
      event.palestrantes.some(palestrante => 
        palestrante.nome.toLowerCase().includes(query.toLowerCase())
      )
    );

    setFilteredEvents(filtered);
  };

  // Adicionar evento
  const handleAddEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `event-${Date.now()}`
    };
    
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  };

  // Permissão: só Admin, Professor e Aluno NEJUSC podem adicionar
  const canAddEvents = ['professor', 'administrador', 'aluno-nejusc'].includes(user?.userType || '');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 pt-16">
        {/* Add Event Button */}
        {canAddEvents && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-end">
              <button
                onClick={() => setIsAddEventModalOpen(true)}
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Adicionar Evento
              </button>
            </div>
          </div>
        )}

        {/* Event Carousel */}
        <EventCarousel
          events={filteredEvents}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Extra Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sobre o NEJUSC
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                O Núcleo de Estudos Jurídicos da UNIJORGE promove o desenvolvimento acadêmico 
                através de eventos, palestras e atividades que conectam teoria e prática, 
                preparando nossos estudantes para os desafios do mundo profissional.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}

export default EventView;

