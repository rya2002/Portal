export function getSemestre(publicacao: string): string {
  const data = new Date(publicacao);
  const ano = data.getFullYear();
  const mes = data.getMonth() + 1;
  const semestre = (mes <= 6) ? 1 : 2;
  return `${ano}.${semestre}`;
}

export function formatarData(data: string): string {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

export function ordenarSemestres(semestres: string[]): string[] {
  return semestres.sort((a, b) => {
    const [anoA, semA] = a.split('.').map(Number);
    const [anoB, semB] = b.split('.').map(Number);
    
    if (anoA !== anoB) return anoB - anoA; // Anos mais recentes primeiro
    return semB - semA; // Semestres mais recentes primeiro
  });
}

export function extrairAreas(artigos: any[], revistas: any[]): number[] {
  const areas = new Set<number>();

  [...artigos, ...revistas].forEach(item => {
    const raw = item.area;
    const parsed =
      typeof raw === "number" ? raw :
      typeof raw === "string" ? Number(raw) :
      NaN;

    if (!isNaN(parsed)) areas.add(parsed);
  });

  return Array.from(areas).sort((a, b) => a - b);
}

/**
 * ✅ Mantém autores como string[], com segurança
 * Adiciona checagens para evitar erro se autores vier null/undefined
 */
export function extrairAutores(artigos: any[], revistas: any[]): string[] {
  const autores = new Set<string>();

  [...artigos, ...revistas].forEach(item => {
    const lista = item.autores ?? [];
    lista.forEach((autor: string) => {
      const nome = autor?.trim();
      if (nome) autores.add(nome);
    });
  });

  return Array.from(autores).sort((a, b) => a.localeCompare(b, 'pt-BR'));
}