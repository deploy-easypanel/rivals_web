'use client';

import { Clock, FileText, LayoutList, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'torneio_info';

interface TorneioData {
  local: string;
  data: string;
  equipes: string;
  regulamento: string;
  horario: string;
  formato: string;
}

export default function TorneioInfo() {
  const [data, setData] = useState<TorneioData>({
    local: '',
    horario: '',
    formato: '',
    data: '',
    equipes: '',
    regulamento: '',
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
            <span className="font-medium">{data.local || 'A definir'}</span>
          </div>
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>Data e Horário:</span>
            <span className="font-medium">{data.data || 'A definir'}</span>
            <span>•</span>
            <span className="font-medium">{data.horario || 'A definir'}</span>
          </div>
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <LayoutList className="w-5 h-5" />
            <span>Formato:</span>
            <span className="font-medium">{data.formato || 'A definir'}</span>
          </div>
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5" />
            <span>Equipes:</span>
            <span className="font-medium">{data.equipes || 'A definir'}</span>
          </div>
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <FileText className="w-5 h-5" />
            <span>Regulamento:</span>
            <a
              href={data.regulamento || '#'}
              className="font-medium text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.regulamento ? 'Ver regulamento' : 'A definir'}
            </a>
          </div>
        </li>
      </ul>
    </section>
  );
}
