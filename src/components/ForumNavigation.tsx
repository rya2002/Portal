import { Settings, FileText, MessageSquare } from "lucide-react";

interface Props {
  activeTab: "discussions" | "manage" | "request-publication";
  onTabChange: (tab: "discussions" | "manage" | "request-publication") => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

export default function ForumNavigation({
  activeTab,
  onTabChange,
  isAdmin,
  isAuthenticated
}: Props) {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between py-4">

          {/* ======== ESQUERDA: Abas ======== */}
          <div className="flex space-x-6">

            {/* Aba Discussões (visível para todos) */}
            <button
              onClick={() => onTabChange("discussions")}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md transition
                ${activeTab === "discussions" ? "bg-gray-200" : "hover:bg-gray-100"}
              `}
            >
              <MessageSquare size={18} />
              Discussões
            </button>

            {/* Aba Administração (somente admins/professores) */}
            {isAdmin && (
              <button
                onClick={() => onTabChange("manage")}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md transition
                  ${activeTab === "manage" ? "bg-gray-200" : "hover:bg-gray-100"}
                `}
              >
                <Settings size={18} />
                Administração
              </button>
            )}
          </div>

          {/* ======== DIREITA: Botão Solicitar Publicação ======== */}
          {isAuthenticated && (
            <button
              onClick={() => onTabChange("request-publication")}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md transition font-medium
                ${activeTab === "request-publication"
                  ? "bg-green-600 text-white"
                  : "bg-green-500 text-white hover:bg-green-600"}
              `}
            >
              <FileText size={18} />
              Solicitar Publicação
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
