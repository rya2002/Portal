import Footer from './Footer';
import AdrieleSantana from '../assets/fotos/AdrieleSantana_.jpg';
import BrunoCastro from '../assets/fotos/BRUNOCASTRO.jpeg';
import DraMariaFatima from '../assets/fotos/MARIADEFÁTIMA.jpeg';
import ManuelaSilva from '../assets/fotos/MANUELASILVA.jpeg';
import MileneSouza from '../assets/fotos/MILENESOUZA.jpg';
import NatáliaCavalcante from '../assets/fotos/NatáliaCavalcante.jpg'; 
import PamelaSantos from '../assets/fotos/PâmelaSantos.jpeg';
import RayannaMendes from '../assets/fotos/RayannaAraújo.jpg';
import VitóriaSilva from '../assets/fotos/VitóriaSantos_.jpg';
import YasminSilva from '../assets/fotos/YasminPires_.jpg';

type Membro = {
  nome: string;
  email: string;
  foto: string;
  funcao?: string;
};

const membrosNEJUSC: Membro[] = [
  {
    nome: 'Dra. Maria de Fátima Cardoso',
    email: 'maria.cardoso@unijorge.edu.br',
    foto: DraMariaFatima,
    funcao: 'Coordenadora',
  },
  {
    nome: 'Bruno Lopo de Castro',
    email: 'brunolopo07@gmail.com',
    foto: BrunoCastro,
  },
  {
    nome: 'Milene Souza Cruz',
    email: 'milenesouzacruz85@gmail.com',
    foto: MileneSouza,
  },
  {
    nome: 'Rayanna Araújo Mendes',
    email: 'mendesrayanna0@gmail.com',
    foto: RayannaMendes,
  },
  {
    nome: 'Yasmin Pires de Jesus Silva',
    email: 'vanuzapires.24@gmail.com',
    foto: YasminSilva,
  },
  {
    nome: 'Adriele Santana Alves',
    email: 'Sntadriele031@gmail.com',
    foto: AdrieleSantana,
  },
  {
    nome: 'Natália Amaral Cavalcante',
    email: 'cavalcantenataliaac@gmail.com',
    foto: NatáliaCavalcante,
  },
  {
    nome: 'Manuela da Silva dos Santos',
    email: 'manuelascrosa@gmail.com',
    foto: ManuelaSilva,
  },
  {
    nome: 'Vitória Santos da Silva',
    email: 'viihrios16@gmail.com',
    foto: VitóriaSilva,
  },
  {
    nome: 'Pâmela das Virgens dos Santos',
    email: 'pamelavirgens8@gmail.com',
    foto: PamelaSantos,
  },
];

const programadores: Membro[] = [
  {
    nome: 'Ryan Cerqueira Maia',
    email: 'maia26498@gmail.com',
    foto: '',
  },
  {
    nome: 'Pedro Rômulo Araújo Cunha',
    email: 'pedroromulo@hotmail.com',
    foto: '',
  },
  {
    nome: 'Leonardo de Oliveira Conceição Barreto',
    email: 'leocontato26@gmail.com',
    foto: '',
  },
  {
    nome: 'Natália Santos Dias Ribeiro',
    email: 'nataliasdrf@gmail.com',
    foto: '',
  },
  {
    nome: 'João Magno da Silva Mendonça',
    email: 'magnojoao40@gmail.com',
    foto: '',
  },
  {
    nome: 'Taciano da Hora',
    email: 'taciano.dev@outlook.com',
    foto: '',
  },
  
];

// Componente para renderizar qualquer membro
function CardMembro({ membro }: { membro: Membro }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center">
      <img
        src={membro.foto}
        alt={membro.nome}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow"
      />
      <h3 className="text-lg font-semibold text-gray-900">{membro.nome}</h3>
      {membro.funcao && <p className="text-indigo-600 font-medium mb-2">{membro.funcao}</p>}
      <p className="text-gray-600">{membro.email}</p>
    </div>
  );
}

export default function EquipePage() {
  const coordenadora = membrosNEJUSC.find((m) => m.funcao === 'Coordenadora');
  const outrosNEJUSC = membrosNEJUSC.filter((m) => m.funcao !== 'Coordenadora');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Seção NEJUSC */}
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Equipe NEJUSC</h1>

        {coordenadora && (
          <div className="bg-white rounded-2xl shadow-md p-8 mb-16 text-center">
            <CardMembro membro={coordenadora} />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {outrosNEJUSC.map((membro) => (
            <CardMembro key={membro.nome} membro={membro} />
          ))}
        </div>

        {/* Seção Programação */}
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Equipe de Programação</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {programadores.map((dev) => (
            <CardMembro key={dev.nome} membro={dev} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
