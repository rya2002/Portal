import { useEffect, useState } from 'react';
import { FileText, BookOpen, TrendingUp } from 'lucide-react';
import { getAllArtigos } from '../../../../services/artigoService';
import { getAllRevistas } from '../../../../services/revistaService';

interface EstatisticasProps {
  totalArtigos?: number;
  totalRevistas?: number;
  totalSemestres?: number;
}

export default function Estatisticas(props: EstatisticasProps) {
  const [totalArtigos, setTotalArtigos] = useState(props.totalArtigos ?? 0);
  const [totalRevistas, setTotalRevistas] = useState(props.totalRevistas ?? 0);
  const [totalSemestres, setTotalSemestres] = useState(props.totalSemestres ?? 0);

  useEffect(() => {
    async function carregarEstatisticas() {
      try {
        const [artigos, revistas] = await Promise.all([
          getAllArtigos(),
          getAllRevistas(),
        ]);

        setTotalArtigos(artigos.length);
        setTotalRevistas(revistas.length);

        // Contar semestres únicos (baseado na data de publicação)
        const semestres = new Set(
          [...artigos, ...revistas].map((item) => {
            const data = new Date(item.publicacao);
            const ano = data.getFullYear();
            const semestre = data.getMonth() + 1 <= 6 ? 1 : 2;
            return `${ano}.${semestre}`;
          })
        );
        setTotalSemestres(semestres.size);
      } catch (err) {
        console.error('Erro ao carregar estatísticas:', err);
      }
    }

    carregarEstatisticas();
  }, []);

  const cards = [
    {
      titulo: 'Artigos Publicados',
      valor: totalArtigos,
      icon: FileText,
      cor: 'blue',
    },
    {
      titulo: 'Revistas Publicadas',
      valor: totalRevistas,
      icon: BookOpen,
      cor: 'green',
    },
    {
      titulo: 'Total de Publicações',
      valor: totalArtigos + totalRevistas,
      icon: TrendingUp,
      cor: 'purple',
    },
    {
      titulo: 'Semestres Registrados',
      valor: totalSemestres,
      icon: TrendingUp,
      cor: 'orange',
    },
  ];

  const getCoreClasses = (cor: string) => {
    const cores = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
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
                <p className="text-sm font-medium text-gray-600">{card.titulo}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.valor}</p>
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
