import { Event } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    titulo: 'Direito Digital e Proteção de Dados na Era da IA',
    descricao: 'Discussão aprofundada sobre os desafios jurídicos da inteligência artificial e a proteção de dados pessoais no ambiente digital.',
    data: '2024-01-20T14:00:00',
    local: 'Auditório Central - Campus Tubarão',
    earea: 'Direito',
    palestrantes: [
      { id: '1', nome: 'Dr. Carlos Silva', foto: '' },
      { id: '2', nome: 'Dra. Ana Santos', foto: '' }
    ],
    duracao: '2 horas',
    gratuito: true,
    classificacaoIndicativa: 'Livre',
    categoria: 'em-andamento'
  },
  {
    id: '2',
    titulo: 'Workshop: Tecnologia Blockchain aplicada ao Direito',
    descricao: 'Hands-on sobre contratos inteligentes, NFTs jurídicos e aplicações práticas da tecnologia blockchain no sistema judiciário.',
    data: '2024-01-20T09:30:00',
    local: 'Laboratório de Informática - Bloco B',
    earea: 'Tecnologia',
    palestrantes: [
      { id: '3', nome: 'Prof. João Martinez', foto: '' },
      { id: '4', nome: 'Eng. Sofia Lima', foto: '' }
    ],
    duracao: '4 horas',
    gratuito: false,
    valor: 45.00,
    classificacaoIndicativa: '14 anos',
    categoria: 'hoje'
  },
  {
    id: '3',
    titulo: 'Direitos Humanos e Tecnologia: Desafios Contemporâneos',
    descricao: 'Mesa redonda sobre os impactos da tecnologia nos direitos fundamentais e a necessidade de regulamentação adequada.',
    data: '2024-01-19T16:00:00',
    local: 'Sala de Conferências - 3º Andar',
    earea: 'Direito',
    palestrantes: [
      { id: '5', nome: 'Dra. Maria Rodriguez', foto: '' },
      { id: '6', nome: 'Dr. Pedro Costa', foto: '' },
      { id: '7', nome: 'Prof. Laura Oliveira', foto: '' }
    ],
    duracao: '1h30min',
    gratuito: true,
    classificacaoIndicativa: 'Livre',
    categoria: 'ultimos-dias'
  },
  {
    id: '4',
    titulo: 'Inovação em Gestão: Metodologias Ágeis para Empresas',
    descricao: 'Palestra sobre implementação de metodologias ágeis em empresas tradicionais e os resultados obtidos.',
    data: '2024-01-25T19:00:00',
    local: 'Auditório Principal - Reitoria',
    earea: 'Administração',
    palestrantes: [
      { id: '8', nome: 'CEO Marcus Johnson', foto: '' }
    ],
    duracao: '1 hora',
    gratuito: true,
    classificacaoIndicativa: 'Livre',
    categoria: 'em-breve'
  },
  {
    id: '5',
    titulo: 'Psicologia Organizacional e Liderança 4.0',
    descricao: 'Discussão sobre os novos modelos de liderança no ambiente corporativo digital e suas implicações psicológicas.',
    data: '2024-01-22T14:30:00',
    local: 'Sala Multimídia - Campus Norte',
    earea: 'Psicologia',
    palestrantes: [
      { id: '9', nome: 'Dra. Fernanda Alves', foto: '' },
      { id: '10', nome: 'Psic. Roberto Gomes', foto: '' }
    ],
    duracao: '2h30min',
    gratuito: false,
    valor: 35.00,
    classificacaoIndicativa: '16 anos',
    categoria: 'em-breve'
  },
  {
    id: '6',
    titulo: 'Marketing Digital: Estratégias para 2024',
    descricao: 'Tendências e estratégias de marketing digital para o próximo ano, com cases de sucesso e ferramentas práticas.',
    data: '2024-01-20T10:00:00',
    local: 'Centro de Convenções - Hall Principal',
    earea: 'Marketing',
    palestrantes: [
      { id: '11', nome: 'Especialista Carlos Mendes', foto: '' },
      { id: '12', nome: 'Influencer Diana Costa', foto: '' }
    ],
    duracao: '3 horas',
    gratuito: false,
    valor: 55.00,
    classificacaoIndicativa: 'Livre',
    categoria: 'hoje'
  },
  {
    id: '7',
    titulo: 'Sustentabilidade na Engenharia Civil',
    descricao: 'Apresentação de técnicas sustentáveis na construção civil e seu impacto no meio ambiente urbano.',
    data: '2024-01-18T15:00:00',
    local: 'Laboratório de Engenharia',
    earea: 'Engenharia',
    palestrantes: [
      { id: '13', nome: 'Eng. Marcos Pereira', foto: '' },
      { id: '14', nome: 'Dra. Luciana Santos', foto: '' }
    ],
    duracao: '2 horas',
    gratuito: true,
    classificacaoIndicativa: 'Livre',
    categoria: 'ultimos-dias'
  },
  {
    id: '8',
    titulo: 'Telemedicina: Futuro da Medicina Digital',
    descricao: 'Exploração das possibilidades da telemedicina, regulamentação atual e perspectivas futuras da medicina digital.',
    data: '2024-01-28T13:30:00',
    local: 'Centro de Ciências da Saúde',
    earea: 'Medicina',
    palestrantes: [
      { id: '15', nome: 'Dr. Ricardo Andrade', foto: '' },
      { id: '16', nome: 'Dra. Patrícia Ferreira', foto: '' }
    ],
    duracao: '1h45min',
    gratuito: false,
    valor: 40.00,
    classificacaoIndicativa: '18 anos',
    categoria: 'em-breve'
  },
  {
    id: '9',
    titulo: 'Educação 5.0: Tecnologias Imersivas no Ensino',
    descricao: 'Workshop sobre realidade virtual, aumentada e inteligência artificial aplicadas à educação moderna.',
    data: '2024-01-20T08:00:00',
    local: 'Centro de Inovação Educacional',
    earea: 'Educação',
    palestrantes: [
      { id: '17', nome: 'Prof. Dra. Helena Rodrigues', foto: '' },
      { id: '18', nome: 'Especialista Tech Bruno Silva', foto: '' }
    ],
    duracao: '4 horas',
    gratuito: true,
    classificacaoIndicativa: 'Livre',
    categoria: 'hoje'
  },
  {
    id: '10',
    titulo: 'Neurociência e Comportamento do Consumidor',
    descricao: 'Como a neurociência pode ser aplicada para entender melhor o comportamento de compra e decisões do consumidor.',
    data: '2024-01-26T17:00:00',
    local: 'Laboratório de Psicologia Experimental',
    earea: 'Psicologia',
    palestrantes: [
      { id: '19', nome: 'Dr. Alexandre Neuroscience', foto: '' }
    ],
    duracao: '2 horas',
    gratuito: false,
    valor: 50.00,
    classificacaoIndicativa: '16 anos',
    categoria: 'em-breve'
  }
];