import React, { useState } from "react";
import { mockUsers, User, toggleUserType } from "../../data/mockData";
import { useAuth } from "../../contexts/AuthContext";

interface PermissionsManagementProps {
  currentUserType: User["userType"];
}

const PermissionsManagement: React.FC<PermissionsManagementProps> = ({
  currentUserType,
}) => {
  const initialUsers = Object.values(mockUsers) as User[];
  const [users, setUsers] = useState<User[]>(initialUsers);

  const { user, setUser } = useAuth(); // precisa que o AuthContext exponha setUser

  const handleToggleNejusc = (email: string) => {
    const updatedUser = toggleUserType(email);
    if (!updatedUser) return;

    // atualizar lista local
    setUsers(Object.values(mockUsers) as User[]);

    // se for o usuário logado, atualizar no contexto também
    if (user?.email === email) {
      setUser(updatedUser);
    }
  };

  if (!["professor", "administrador"].includes(currentUserType)) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Gerenciar Permissões
        </h2>
        <p className="text-gray-600">
          Você não tem permissão para acessar esta seção.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Gerenciar Permissões
      </h2>

      <div className="space-y-4">
        {users.map((u) => (
          <div
            key={u.email}
            className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
          >
            <div>
              <p className="font-medium text-gray-900">{u.name}</p>
              <p className="text-sm text-gray-600">{u.email}</p>
              <p className="text-xs text-gray-500 capitalize">Tipo: {u.userType}</p>
            </div>

            {["aluno-comum", "aluno-nejusc"].includes(u.userType) && (
              <button
                onClick={() => handleToggleNejusc(u.email)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  u.userType === "aluno-comum"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                {u.userType === "aluno-comum"
                  ? "Promover a NEJUSC"
                  : "Reverter a Aluno"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionsManagement;