import React from 'react';
import ItemCard from './ItemCard';
import type { Artigo, Revista } from '../../types/index';

interface SemestreSectionProps {
  semestre: string;
  artigos: Artigo[];
  revistas: Revista[];
}

const SemestreSection: React.FC<SemestreSectionProps> = ({ semestre, artigos, revistas }) => {
  const temArtigos = artigos.length > 0;
  const temRevistas = revistas.length > 0;

  if (!temArtigos && !temRevistas) return null;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100">
        {semestre}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {revistas.map(r => (
          <ItemCard key={r.id} tipo="revista" item={r} />
        ))}

        {artigos.map(a => (
          <ItemCard key={a.id} tipo="artigo" item={a} />
        ))}
      </div>
    </section>
  );
};

export default SemestreSection;
