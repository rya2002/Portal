import React from 'react';
import { MapPin, Calendar, Users, Clock } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden min-w-[320px] max-w-sm mx-2">
      {/* Imagem do Evento */}
      <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden">
        {event.imagem ? (
          <img src={event.imagem} alt={event.nome} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-center">
              <Calendar className="h-12 w-12 mx-auto mb-2 opacity-70" />
              <span className="text-sm font-medium opacity-90">NEJUSC</span>
            </div>
          </div>
        )}
        
        {/* Badge de Categoria */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white">
            {event.area}
          </span>
        </div>
      </div>

      <div className="p-5">
        {/* Título */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {event.nome}
        </h3>

        {/* Descrição */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {event.descricao}
        </p>

        {/* Informações do Evento */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{formatDate(event.data)}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{event.local}</span>
          </div>

          {event.duracao && (
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{event.duracao}</span>
            </div>
          )}
        </div>

        {/* Palestrantes */}
        {event.palestrantes.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Users className="h-4 w-4 mr-1 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Palestrantes:
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {event.palestrantes.map((palestrante, _index) => (
                <span
                  key={palestrante.id}
                  className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                >
                  {palestrante.nome}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Classificação Indicativa */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {event.classificacaoIndicativa}
          </span>
          
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;