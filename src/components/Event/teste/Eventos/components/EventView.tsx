import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Header from './Header';
import EventCarousel from './EventCarousel';
import AddEventModal from './AddEventModal';
import Footer from './Footer';
import { Event, UserProfile, User } from '../types';
import { mockEvents } from '../data/mockEvents';

function EventView() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [activeCategory, setActiveCategory] = useState('em-andamento');
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  
  // User profile state (simulating logged user)
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    nome: 'João Silva',
    perfil: 'aluno'
  });

  // Profile cycling for demo purposes
  const profiles: { perfil: UserProfile; nome: string }[] = [
    { perfil: 'aluno', nome: 'João Silva' },
    { perfil: 'professor', nome: 'Prof. Maria Santos' },
    { perfil: 'admin', nome: 'Admin Carlos Lima' }
  ];

  const handleProfileToggle = () => {
    const currentIndex = profiles.findIndex(p => p.perfil === currentUser.perfil);
    const nextIndex = (currentIndex + 1) % profiles.length;
    const nextProfile = profiles[nextIndex];
    
    setCurrentUser({
      ...currentUser,
      perfil: nextProfile.perfil,
      nome: nextProfile.nome
    });
  };

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

  const handleAddEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `event-${Date.now()}`
    };
    
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  };

  const canAddEvents = currentUser.perfil === 'professor' || currentUser.perfil === 'admin';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        currentUser={currentUser}
        onSearch={handleSearch}
        onProfileToggle={handleProfileToggle}
      />

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {/* Add Event Button for Professors/Admins */}
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

        {/* Additional Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sobre o NEJUSC
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                O Núcleo de Estudos Jurídicos da UNISUL promove o desenvolvimento acadêmico 
                através de eventos, palestras e atividades que conectam teoria e prática, 
                preparando nossos estudantes para os desafios do mundo profissional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Conhecimento</h3>
                <p className="text-gray-600">
                  Eventos com especialistas renomados compartilhando conhecimento atualizado e relevante.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Networking</h3>
                <p className="text-gray-600">
                  Oportunidades de conexão com profissionais, acadêmicos e estudantes da área.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Inovação</h3>
                <p className="text-gray-600">
                  Discussões sobre tecnologias emergentes e suas aplicações no mundo jurídico.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

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