import React, { useState } from "react";
import axios from "axios";

interface FormData {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
}


const Register: React.FC = () => {
   
    const API_URL = "https://localhost:5186/api/usuario";

    const [formData, setFormData] = useState<FormData>({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
    });

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    
    const hashPassword = async (password: string): Promise<string> => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
       
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
      
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
            setError("Preencha todos os campos obrigatórios.");
            setIsLoading(false);
            return;
        }

        if (formData.senha !== formData.confirmarSenha) {
            setError("As senhas não coincidem.");
            setIsLoading(false);
            return;
        }

        try {
            
            const hashedPassword = await hashPassword(formData.senha);
            
            
            const response = await axios.post(API_URL, {
                nome: formData.nome,
                email: formData.email,
                senha: hashedPassword,
            });

            
            if (response.status === 201) {
                setSuccess("Cadastro realizado com sucesso! Redirecionando para a tela de Login...");
                
                
                setTimeout(() => {
                    setSuccess("Redirecionamento simulado. Clique para tentar outro cadastro.");
                    setFormData({ nome: "", email: "", senha: "", confirmarSenha: "" });
                    setIsLoading(false);
                }, 1500);
            }
        } catch (error: unknown) { // Use 'unknown' e faça a checagem segura
            setIsLoading(false);
            
            let errorMessage = "Erro de conexão desconhecido ao registrar o usuário.";

            
            if (axios.isAxiosError(error) && error.response) {
                
                errorMessage = error.response.data?.message || `Erro do servidor: ${error.response.statusText}`;
            }

            console.error("Erro ao registrar o usuário:", error);
            setError(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <script src="https://cdn.tailwindcss.com"></script>
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-6 transform hover:scale-[1.01] transition duration-300">
                <style jsx>{`
                    /* Font Inter */
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                    * { font-family: 'Inter', sans-serif; }
                `}</style>
                <h2 className="text-3xl font-extrabold text-center text-gray-900">
                    🚀 Criar Conta
                </h2>

                {/* Mensagens de feedback */}
                {error && (
                    <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg text-sm transition-all duration-300">
                        <p className="font-semibold">Erro:</p>
                        <p>{error}</p>
                    </div>
                )}
                {success && (
                    <div className="p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg text-sm transition-all duration-300">
                        <p className="font-semibold">Sucesso!</p>
                        <p>{success}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Campo Nome */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome completo *</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition shadow-sm"
                            placeholder="Digite seu nome completo"
                        />
                    </div>

                    {/* Campo E-mail */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">E-mail *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition shadow-sm"
                            placeholder="exemplo@email.com"
                        />
                    </div>

                    {/* Campo Senha */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Senha *</label>
                        <input
                            type="password"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition shadow-sm"
                            placeholder="Digite uma senha segura"
                        />
                    </div>

                    {/* Campo Confirmar Senha */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirmar senha *</label>
                        <input
                            type="password"
                            name="confirmarSenha"
                            value={formData.confirmarSenha}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition shadow-sm"
                            placeholder="Confirme sua senha"
                        />
                    </div>

                    {/* Botão Cadastrar */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full font-bold py-3 rounded-xl transition transform duration-150 shadow-md 
                            ${isLoading 
                                ? "bg-blue-400 cursor-not-allowed" 
                                : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99]"
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Registrando...
                            </span>
                        ) : (
                            "Cadastrar"
                        )}
                    </button>
                </form>

                {/* Link para Login */}
                <p className="text-center text-sm text-gray-600 pt-2">
                    Já tem uma conta?{" "}
                    <button
                        // Se estiver usando react-router-dom, descomente e use:
                        // onClick={() => navigate("/login")}
                        onClick={() => console.log("Simulação: Navegando para /login")}
                        className="text-blue-600 hover:underline font-semibold focus:outline-none"
                    >
                        Fazer login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
