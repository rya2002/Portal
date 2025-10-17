

import React, { useState, useEffect, useCallback } from 'react';

import { getAllEventosRequest } from '../services/eventoService'; 


interface Evento {
    id: string; 
    nome: string;
    data: string;
   
}

const EventView: React.FC = () => {
    // 1. Estados para gerenciar a UI
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 2. Função para buscar os dados
    const fetchEventos = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Chama a função de serviço para interagir com o Controller
            const data = await getAllEventosRequest();
            setEventos(data);
        } catch (err) {
            console.error("Erro ao buscar eventos:", err);
            // Define uma mensagem de erro amigável
            setError('Não foi possível carregar os eventos. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    }, []);

    // 3. Efeito para carregar os dados na montagem do componente
    useEffect(() => {
        fetchEventos();
    }, [fetchEventos]);

    // 4. Lógica de renderização da UI
    
    if (loading) {
        return (
            <div className="text-center py-10">
                <p>Carregando eventos... ⏳</p> 
                {/* Você pode adicionar um componente de spinner aqui */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-500">
                <p>❌ Erro: {error}</p>
                <button 
                    onClick={fetchEventos} 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Tentar Novamente
                </button>
            </div>
        );
    }
    
    if (eventos.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>Nenhum evento encontrado no momento. 🗓️</p>
                {/* Link ou botão para criar novo evento, se aplicável */}
            </div>
        );
    }

    // 5. Renderização da lista de eventos
    return (
        <section className="space-y-6">
            <h1 className="text-3xl font-bold border-b pb-2">Próximos Eventos</h1>
            
            {eventos.map((evento) => (
                <div 
                    key={evento.id} 
                    className="p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-300 bg-white"
                >
                    <h2 className="text-xl font-semibold text-indigo-600">{evento.nome}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Data: {new Date(evento.data).toLocaleDateString()}
                    </p>
                    {/* Adicione mais detalhes do evento aqui, se houver */}
                    <div className="mt-3 flex space-x-2">
                        {/* Exemplo de botões de Ação */}
                        <button className="text-sm text-blue-500 hover:underline">Ver Detalhes</button>
                        {/* Se o usuário tiver permissão: */}
                        {/* <button className="text-sm text-green-500 hover:underline">Editar</button> */}
                        {/* <button className="text-sm text-red-500 hover:underline">Excluir</button> */}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default EventView;