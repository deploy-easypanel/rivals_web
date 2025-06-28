'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, LayoutList, MapPin, Pencil, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'torneio_info';

interface TorneioData {
  local: string;
  horario: string;
  formato: string;
}

export default function AdminTorneioInfo() {
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState<TorneioData>({
    local: 'Stream Twitch',
    horario: '14:00 - 20:00',
    formato: 'Eliminação Simples',
  });

  // Carregar dados do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.local && parsed.horario && parsed.formato) {
          setData(parsed);
        }
      } catch {
        // dados inválidos
      }
    }
  }, []);

  // Salvar no localStorage
  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setEditMode(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Bloco de Edição */}
      <div className="w-full md:w-[40%] bg-white rounded-xl shadow-md p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-orange-600 flex items-center gap-2">
            <Pencil className="w-5 h-5" />
            Editar Informações
          </h3>
          {!editMode ? (
            <Button variant="outline" onClick={() => setEditMode(true)}>
              Editar
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Local</label>
            <Input
              disabled={!editMode}
              value={data.local}
              onChange={(e) =>
                setData((d) => ({ ...d, local: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Horário</label>
            <Input
              disabled={!editMode}
              value={data.horario}
              onChange={(e) =>
                setData((d) => ({ ...d, horario: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Formato</label>
            <Input
              disabled={!editMode}
              value={data.formato}
              onChange={(e) =>
                setData((d) => ({ ...d, formato: e.target.value }))
              }
            />
          </div>
        </div>
      </div>

      {/* Bloco de Visualização */}
      <div className="w-full md:w-[60%] bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center text-orange-600">
          <MapPin className="w-5 h-5 mr-2" />
          Informações do Torneio
        </h3>
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>Local:</span>
            </div>
            <span className="font-medium">{data.local}</span>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>Horário:</span>
            </div>
            <span className="font-medium">{data.horario}</span>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <LayoutList className="w-5 h-5" />
              <span>Formato:</span>
            </div>
            <span className="font-medium">{data.formato}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
