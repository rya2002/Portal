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

export function extrairAreas(artigos: any[], revistas: any[]): string[] {
  const areas = new Set<string>();
  [...artigos, ...revistas].forEach(item => areas.add(item.area));
  return Array.from(areas).sort();
}

export function extrairAutores(artigos: any[], revistas: any[]): string[] {
  const autores = new Set<string>();
  [...artigos, ...revistas].forEach(item => 
    item.autores.forEach((autor: string) => autores.add(autor))
  );
  return Array.from(autores).sort();
}