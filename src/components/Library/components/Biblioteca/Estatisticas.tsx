import { FileText, BookOpen, TrendingUp } from 'lucide-react';

type ColorKey = 'blue' | 'green' | 'purple';

type CardDef = {
  titulo: string;
  valor: number;
  icon: React.ComponentType<{ className?: string }>;
  cor: ColorKey;
};

interface EstatisticasProps {
  totalArtigos: number;
  totalRevistas: number;
  totalSemestres: number;
}

export default function Estatisticas({ totalArtigos, totalRevistas, }: EstatisticasProps) {
  const cards: CardDef[] = [
    { titulo: 'Artigos Publicados', valor: totalArtigos, icon: FileText, cor: 'blue' },
    { titulo: 'Revistas Publicadas', valor: totalRevistas, icon: BookOpen, cor: 'green' },
    { titulo: 'Total de Publicações', valor: totalArtigos + totalRevistas, icon: TrendingUp, cor: 'purple' },
  ];

  const colorClasses: Record<ColorKey, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.titulo}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.valor}</p>
              </div>
              <div className={`p-3 rounded-lg ${colorClasses[card.cor]}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
