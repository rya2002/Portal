import { FileText, BookOpen, Calendar, TrendingUp } from 'lucide-react';

interface EstatisticasProps {
  totalArtigos: number;
  totalRevistas: number;
  totalSemestres: number;
}

export default function Estatisticas({ totalArtigos, totalRevistas, totalSemestres }: EstatisticasProps) {
  const cards = [
    {
      titulo: 'Artigos Publicados',
      valor: totalArtigos,
      icon: FileText,
      cor: 'blue'
    },
    {
      titulo: 'Revistas Publicadas',
      valor: totalRevistas,
      icon: BookOpen,
      cor: 'green'
    },
    {
      titulo: 'Semestres com Publicação',
      valor: totalSemestres,
      icon: Calendar,
      cor: 'purple'
    },
    {
      titulo: 'Total de Publicações',
      valor: totalArtigos + totalRevistas,
      icon: TrendingUp,
      cor: 'orange'
    }
  ];

  const getCoreClasses = (cor: string) => {
    const cores = {
      blue: 'bg-blue-100  text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return cores[cor as keyof typeof cores];
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const coreClasses = getCoreClasses(card.cor);
        
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {card.titulo}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {card.valor}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${coreClasses}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}