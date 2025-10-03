import { Calendar, FileText, BookOpen } from 'lucide-react';
import { SemestreData } from '../../types';
import ItemCard from './ItemCard';

interface SemestreSectionProps {
  semestreData: SemestreData;
  tipoAtivo: 'artigo' | 'revista';
}

export default function SemestreSection({ semestreData, tipoAtivo }: SemestreSectionProps) {
  const itens = tipoAtivo === 'artigo' ? semestreData.artigos : semestreData.revistas;
  const totalArtigos = semestreData.artigos.length;
  const totalRevistas = semestreData.revistas.length;

  if (itens.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      {/* Cabeçalho do Semestre */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 mb-6 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {semestreData.semestre}
              </h2>
              <p className="text-sm text-gray-600">
                {semestreData.semestre.endsWith('.1') ? 'Janeiro - Junho' : 'Julho - Dezembro'} {semestreData.semestre.split('.')[0]}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-gray-600">
              <FileText className="h-4 w-4" />
              <span>{totalArtigos} artigo{totalArtigos !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <BookOpen className="h-4 w-4" />
              <span>{totalRevistas} revista{totalRevistas !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Itens */}
      <div className="space-y-4">
        {itens.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            tipo={tipoAtivo}
          />
        ))}
      </div>
    </section>
  );
}
