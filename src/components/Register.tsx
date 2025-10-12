import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../services/api";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.nome || !formData.email || !formData.senha) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    // ======================= INÍCIO DA CORREÇÃO =======================
    // Monta o objeto que a API espera, com os nomes corretos das propriedades.
    const userData = {
      nomeCompleto: formData.nome,
      email: formData.email,
      senhaHash: formData.senha,    // <-- MUDOU AQUI para corresponder à API
      tipoUsuarioId: 1              // <-- MUDOU AQUI para corresponder à API (ajuste o valor se necessário)
    };
    // ======================== FIM DA CORREÇÃO ========================

    try {
      // Chama a API com os dados corrigidos
      await registerRequest(userData);
      setSuccess("Cadastro realizado com sucesso! Redirecionando para o login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      const apiError = err.response?.data?.message || "Erro ao cadastrar. O e-mail pode já estar em uso.";
      setError(apiError);
    }
  };

  // O resto do seu componente (JSX) continua o mesmo...
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Criar Conta</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome completo *</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="exemplo@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha *</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Digite uma senha segura"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmar senha *</label>
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirme sua senha"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Já tem uma conta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Fazer login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;