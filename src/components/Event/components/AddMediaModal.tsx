import React, { useState } from "react";
import { Dialog } from "../../../../node_modules/@headlessui/react";
import { AddMediaPayload } from "../types";

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMedia: (media: AddMediaPayload) => void;
}

const AddMediaModal: React.FC<AddMediaModalProps> = ({
  isOpen,
  onClose,
  onAddMedia,
}) => {
  const [type, setType] = useState<"foto" | "video">("foto");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) return;

    onAddMedia({
      type,
      url,
      title: title || undefined,
    });

    // Resetar estado
    setUrl("");
    setTitle("");
    setType("foto");
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Fundo */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Adicionar Mídia
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tipo de mídia */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "foto" | "video")}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="foto">Foto</option>
                <option value="video">Vídeo</option>
              </select>
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL da Mídia
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Cole o link da foto ou vídeo"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            {/* Título opcional */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título (opcional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Encontro do grupo"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            {/* Ações */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Adicionar
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddMediaModal;
