import React from 'react';
import ItemCard from './ItemCard';
import type { Artigo, Revista } from '../../types';

interface SemestreSectionProps {
  semestre: string;
  artigos: Artigo[];
  revistas: Revista[];
  onDeleteArtigo?: (id: string) => void;
  onDeleteRevista?: (id: string) => void;
}

const SemestreSection: React.FC<SemestreSectionProps> = ({
  semestre,
  artigos,
  revistas,
  onDeleteArtigo,
  onDeleteRevista
}) => {
  const temArtigos = artigos.length > 0;
  const temRevistas = revistas.length > 0;

  if (!temArtigos && !temRevistas) return null;

  const gerarKey = (prefix: string, id?: string, index?: number) => {
    if (id && id !== '00000000-0000-0000-0000-000000000000') return `${prefix}-${id}`;
    return `${prefix}-${index}-${Math.random()}`;
  };

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100">
        {semestre}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {revistas.map((r, index) => (
          <ItemCard
            key={gerarKey('revista', r.id, index)}
            tipo="revista"
            item={r}
            onDelete={onDeleteRevista}
          />
        ))}

        {artigos.map((a, index) => (
          <ItemCard
            key={gerarKey('artigo', a.id, index)}
            tipo="artigo"
            item={a}
            onDelete={onDeleteArtigo}
          />
        ))}
      </div>
    </section>
  );
};

export default SemestreSection;
