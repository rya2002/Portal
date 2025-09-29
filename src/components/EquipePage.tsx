import Footer from './Footer';

type Membro = {
  nome: string;
  email: string;
  foto: string;
  funcao?: string;
};

const membros: Membro[] = [
  {
    nome: 'Dra. Maria de Fátima Cardoso',
    email: 'maria.cardoso@unijorge.edu.br',
    foto: '/images/maria.jpg',
    funcao: 'Coordenadora',
  },
  {
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    foto: '/images/joao.jpg',
  },
  {
    nome: 'Ana Souza',
    email: 'ana.souza@email.com',
    foto: '/images/ana.jpg',
  },
  // Adicione mais integrantes aqui
];

export default function EquipePage() {
  const coordenadora = membros.find((m) => m.funcao === 'Coordenadora');
  const outros = membros.filter((m) => m.funcao !== 'Coordenadora');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Nossa Equipe
        </h1>

        {/* Coordenadora */}
        {coordenadora && (
          <div className="bg-white rounded-2xl shadow-md p-8 mb-16 text-center">
            <img
              src={coordenadora.foto}
              alt={coordenadora.nome}
              className="w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {coordenadora.nome}
            </h2>
            <p className="text-indigo-600 font-medium mb-2">{coordenadora.funcao}</p>
            <p className="text-gray-700">{coordenadora.email}</p>
          </div>
        )}

        {/* Outros membros */}
        <div className="grid md:grid-cols-3 gap-8">
          {outros.map((membro) => (
            <div
              key={membro.nome}
              className="bg-white rounded-2xl shadow-md p-6 text-center"
            >
              <img
                src={membro.foto}
                alt={membro.nome}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow"
              />
              <h3 className="text-lg font-semibold text-gray-900">{membro.nome}</h3>
              <p className="text-gray-600">{membro.email}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
