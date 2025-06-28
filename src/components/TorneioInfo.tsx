'use client';

import { Clock, LayoutList, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'torneio_info';

interface TorneioData {
  local: string;
  horario: string;
  formato: string;
}

export default function TorneioInfo() {
  const [data, setData] = useState<TorneioData>({
    local: '',
    horario: '',
    formato: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.local && parsed.horario && parsed.formato) {
          setData(parsed);
        }
      } catch {
        // Dados inválidos
      }
    }
  }, []);

  return (
    <section className="bg-white rounded-xl shadow-md p-6 w-full">
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
          <span className="font-medium">{data.local || 'A definir'}</span>
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>Horário:</span>
          </div>
          <span className="font-medium">{data.horario || 'A definir'}</span>
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <LayoutList className="w-5 h-5" />
            <span>Formato:</span>
          </div>
          <span className="font-medium">{data.formato || 'A definir'}</span>
        </li>
      </ul>
    </section>
  );
}
