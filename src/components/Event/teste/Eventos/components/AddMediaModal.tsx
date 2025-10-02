import { Dialog } from '@headlessui/react';
import { useState } from 'react';

interface AddMediaPayload {
  type: 'foto' | 'video';
  url: string;
  title?: string;
}

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMedia: (media: AddMediaPayload) => void;
}

export default function AddMediaModal({
  isOpen,
  onClose,
  onAddMedia,
}: AddMediaModalProps) {
  const [mediaType, setMediaType] = useState<'foto' | 'video'>('foto');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    onAddMedia({ type: mediaType, url: trimmed, title: title.trim() || undefined });
    setUrl('');
    setTitle('');
    setMediaType('foto');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
            Adicionar Foto ou Vídeo
          </Dialog.Title>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as 'foto' | 'video')}
              className="w-full border rounded p-2"
            >
              <option value="foto">Foto</option>
              <option value="video">Vídeo</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">URL da mídia</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full border rounded p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Título (opcional)</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título curto da mídia"
              className="w-full border rounded p-2"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancelar
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Publicar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
