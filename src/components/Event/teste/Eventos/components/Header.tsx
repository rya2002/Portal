import React, { useState } from 'react';
import { Search, User, Settings, Menu, X } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  currentUser: { nome: string; perfil: UserProfile };
  onSearch: (query: string) => void;
  onProfileToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onSearch, onProfileToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Título */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
              Eventos NEJUSC
            </h1>
          </div>

          {/* Campo de Busca - Desktop */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Busque em todo portal"
              />
            </form>
          </div>

          {/* Botões de Ação - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onProfileToggle}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <User className="h-4 w-4 mr-2" />
              Trocar Perfil
            </button>
            
            {(currentUser.perfil === 'professor' || currentUser.perfil === 'admin') && (
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <Settings className="h-4 w-4 mr-2" />
                Área do Organizador
              </button>
            )}

            <div className="text-sm text-gray-600">
              <span className="font-medium">{currentUser.nome}</span>
              <span className="ml-1 capitalize">({currentUser.perfil})</span>
            </div>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Expandido */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {/* Campo de Busca - Mobile */}
            <form onSubmit={handleSearch} className="px-3 py-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Busque em todo portal"
                />
              </div>
            </form>

            <div className="px-3 py-2">
              <div className="text-sm text-gray-600 mb-3">
                <span className="font-medium">{currentUser.nome}</span>
                <span className="ml-1 capitalize">({currentUser.perfil})</span>
              </div>
              
              <button
                onClick={onProfileToggle}
                className="w-full mb-2 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <User className="h-4 w-4 mr-2" />
                Trocar Perfil
              </button>
              
              {(currentUser.perfil === 'professor' || currentUser.perfil === 'admin') && (
                <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Área do Organizador
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;