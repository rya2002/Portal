export function AdminDashboard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>

      <div className="space-y-4">
        <div className="p-4 rounded-lg border">
          <h2 className="font-semibold">Gerenciar Discussões</h2>
          <p className="text-gray-600">
            Moderação, exclusão e edição.
          </p>
        </div>

        <div className="p-4 rounded-lg border">
          <h2 className="font-semibold">Gerenciar Usuários</h2>
          <p className="text-gray-600">
            Permissões, bloqueios e etc.
          </p>
        </div>
      </div>
    </div>
  );
}
