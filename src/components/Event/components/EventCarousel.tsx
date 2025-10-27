import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Event } from '../types';
import EventCard from './EventCard';

interface EventCarouselProps {
  eventos: Event[];
  activeCategory: string;
  onCategoryChange: React.Dispatch<React.SetStateAction<string>>;
  onRemove: (id: string) => Promise<void>;
  showFilter?: boolean;
}


const EventCarousel: React.FC<EventCarouselProps> = ({
  eventos,
  activeCategory,
  onCategoryChange,
  showFilter = true
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categories = [
    { key: 'em-andamento', label: 'Em andamento', color: 'red' },
    { key: 'hoje', label: 'Hoje', color: 'blue' },
    { key: 'ultimos-dias', label: 'Últimos dias', color: 'blue' },
    { key: 'em-breve', label: 'Em breve', color: 'blue' }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // Largura do card + margin
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;

      if (direction === 'left') {
        scrollContainerRef.current.scrollTo({
          left: Math.max(0, currentScroll - scrollAmount),
          behavior: 'smooth'
        });
      } else {
        scrollContainerRef.current.scrollTo({
          left: Math.min(maxScroll, currentScroll + scrollAmount),
          behavior: 'smooth'
        });
      }
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const filteredEvents = eventos.filter(evento => evento.categoria === activeCategory);

  return (
    <section className="bg-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da seção */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-1 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => onCategoryChange(category.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeCategory === category.key
                    ? category.color === 'red'
                      ? 'bg-red-600 text-white'
                      : 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {showFilter && (
            <button className="flex items-center px-3 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              <Filter className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline text-sm">Filtros</span>
            </button>
          )}
        </div>

        {/* Container do Carrossel */}
        <div className="relative">
          {/* Botão Esquerda */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-200"
              style={{ marginLeft: '-20px' }}
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
          )}

          {/* Botão Direita */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-200"
              style={{ marginRight: '-20px' }}
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          )}

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto scrollbar-hide space-x-0 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="w-full text-center py-12">
                <div className="text-gray-500">
                  <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Nenhum evento encontrado</p>
                  <p className="text-sm">Não há eventos para a categoria selecionada.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCarousel;