import React from 'react';
import { User } from '../data/mockData';

interface EventHeaderProps {
  currentUser: User;
  onSearch: (query: string) => void;
  onProfileToggle: () => void;
}

const EventHeader: React.FC<EventHeaderProps> = ({ currentUser, onSearch, onProfileToggle }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-red-600">NEJUSC</h1>

        {/* Campo de busca */}
        <input
          type="text"
          placeholder="Buscar eventos..."
          className="border rounded-lg px-3 py-1 text-sm"
          onChange={(e) => onSearch(e.target.value)}
        />

        {/* Perfil do usuário */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">{currentUser.name}</span>
          <button
            onClick={onProfileToggle}
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
          >
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <span className="text-gray-600">👤</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default EventHeader;

