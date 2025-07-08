'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getTorneioInfo, saveTorneioInfo } from '@/services/torneio_info';
import { TorneioInfoData } from '@/types';
import {
  Clock,
  FileText,
  LayoutList,
  MapPin,
  Pencil,
  Save,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminTorneioInfo() {
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState<TorneioInfoData>({
    local: '',
    horario: '',
    formato: '',
    data: '',
    equipes: '',
    regulamento: '',
  });
  const [loading, setLoading] = useState(true);

  // Buscar dados da API na montagem do componente
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const torneio = await getTorneioInfo();
        if (torneio) {
          setData(torneio);
        }
      } catch (error) {
        console.error('Erro ao carregar informações do torneio:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const success = await saveTorneioInfo(data);
      if (!success) throw new Error('Falha ao salvar informações');
      setEditMode(false);
      alert('Informações salvas com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar informações do torneio.');
    }
  };

  if (loading) {
    return <p>Carregando informações do torneio...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Edição */}
      <section className="w-full md:w-[60%] bg-white rounded-xl shadow-md p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
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
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['Local', 'local'],
            ['Data', 'data'],
            ['Horário', 'horario'],
            ['Formato', 'formato'],
            ['Equipes', 'equipes'],
            ['Regulamento (link)', 'regulamento'],
          ].map(([label, key]) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">{label}</label>
              <Input
                disabled={!editMode}
                value={data[key as keyof TorneioInfoData]}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    [key as keyof TorneioInfoData]: e.target.value,
                  }))
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* Visualização */}
      <section className="w-full bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center text-orange-600">
          <MapPin className="w-5 h-5 mr-2" />
          Informações Gerais do Torneio
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
              <span>Data e Horário:</span>
            </div>
            <span className="font-medium">
              {data.data} • {data.horario}
            </span>
          </li>

          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <LayoutList className="w-5 h-5" />
              <span>Formato:</span>
            </div>
            <span className="font-medium">{data.formato}</span>
          </li>

          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span>Equipes:</span>
            </div>
            <span className="font-medium">{data.equipes}</span>
          </li>

          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <FileText className="w-5 h-5" />
              <span>Regulamento:</span>
            </div>
            <a
              href={data.regulamento}
              className="font-medium text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver regulamento
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
