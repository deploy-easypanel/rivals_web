'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  createMatch,
  deleteMatch,
  getMatches,
  updateMatch,
} from '@/services/partidas';
import { Match } from '@/types';
import {
  Activity,
  Calendar,
  CheckCircle,
  Clock,
  Link2,
  Pen,
  Play,
  PlusCircle,
  Trash2,
  Users2,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminPartidas() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

  const selectedMatch = matches.find((m) => m.id === selectedMatchId);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMatches();
        setMatches(data);
      } catch (err) {
        console.error('Erro ao buscar partidas:', err);
      }
    }
    fetchData();
  }, []);

  const handleAddMatch = async () => {
    const newMatch: Omit<Match, 'id'> = {
      team1: 'Novo Time 1',
      team2: 'Novo Time 2',
      time: '00:00',
      date: 'Dia',
      link: 'https://twitch.tv/',
      status: 'ao vivo',
    };

    try {
      const created = await createMatch(newMatch);
      setMatches([...matches, created]);
      if (typeof created.id === 'number') {
        setSelectedMatchId(created.id);
      }
    } catch (err) {
      console.error('Erro ao criar partida:', err);
    }
  };

  const handleUpdate = async (field: keyof Match, value: string) => {
    if (!selectedMatch) return;

    const updatedMatch = { ...selectedMatch, [field]: value };
    if (typeof updatedMatch.id !== 'number') {
      console.error('ID da partida é inválido:', updatedMatch.id);
      return;
    }
    try {
      await updateMatch(updatedMatch.id, updatedMatch);
      setMatches((prev) =>
        prev.map((m) => (m.id === updatedMatch.id ? updatedMatch : m))
      );
    } catch (err) {
      console.error('Erro ao atualizar partida:', err);
    }
  };

  const handleDeleteMatch = async (id: number) => {
    try {
      await deleteMatch(id);
      setMatches(matches.filter((m) => m.id !== id));
      if (selectedMatchId === id) setSelectedMatchId(null);
    } catch (err) {
      console.error('Erro ao deletar partida:', err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* GERENCIAR PARTIDAS */}
      <section className="w-full md:w-[30%] bg-white rounded-xl shadow-md p-6 space-y-8">
        <h2 className="text-xl font-bold text-orange-600 flex items-center">
          <Pen className="w-5 h-5 mr-2" />
          Gerenciar Partidas
        </h2>

        <Button
          onClick={handleAddMatch}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
        >
          <PlusCircle className="w-5 h-5" />
          Nova Partida
        </Button>

        {selectedMatch && (
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold text-orange-700 flex items-center">
              <Pen className="w-4 h-4 mr-2" />
              Gerenciar Partida
            </h3>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <Clock className="w-8 h-8 text-gray-500" />
                <Input
                  value={selectedMatch.date}
                  onChange={(e) => handleUpdate('date', e.target.value)}
                  placeholder="Data"
                />
                <Input
                  value={selectedMatch.time}
                  onChange={(e) => handleUpdate('time', e.target.value)}
                  placeholder="Hora"
                />
              </div>

              <div className="flex sm:flex-row items-center gap-2">
                <Users2 className="w-8 h-8 text-gray-500" />
                <Input
                  value={selectedMatch.team1}
                  onChange={(e) => handleUpdate('team1', e.target.value)}
                  placeholder="Time 1"
                />
                <Input
                  value={selectedMatch.team2}
                  onChange={(e) => handleUpdate('team2', e.target.value)}
                  placeholder="Time 2"
                />
              </div>

              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-gray-500" />
                <Input
                  value={selectedMatch.link}
                  onChange={(e) => handleUpdate('link', e.target.value)}
                  placeholder="Link da Transmissão"
                />
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gray-600" />
                <Select
                  value={selectedMatch.status}
                  onValueChange={(value) =>
                    handleUpdate('status', value as 'ao vivo' | 'encerrada')
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ao vivo">Ao Vivo</SelectItem>
                    <SelectItem value="encerrada">Encerrada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* LISTA DE PARTIDAS */}
      <section className="w-full bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold flex items-center text-orange-600 mb-4">
          <Calendar className="w-6 h-6 mr-2" />
          Partidas do Torneio
        </h2>

        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className={`flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl hover:ring-2 transition-all group cursor-pointer shadow-sm
        ${
          match.status === 'ao vivo'
            ? 'bg-green-100 hover:ring-green-400'
            : 'bg-gray-100 hover:ring-gray-400'
        }`}
              onClick={() =>
                match.id !== undefined && setSelectedMatchId(match.id)
              }
            >
              <div className="mb-2 md:mb-0">
                <p className="text-sm text-gray-500">
                  {match.date} • {match.time}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {match.team1} <span className="text-gray-400">vs</span>{' '}
                  {match.team2}
                </p>
                <p
                  className={`mt-1 flex items-center gap-1 font-semibold ${
                    match.status === 'ao vivo'
                      ? 'text-green-600'
                      : 'text-gray-600'
                  }`}
                >
                  {match.status === 'ao vivo' ? (
                    <Activity className="w-5 h-5" />
                  ) : (
                    <CheckCircle className="w-5 h-5" />
                  )}
                  {match.status === 'ao vivo' ? 'AO VIVO' : 'Encerrada'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  className="bg-green-400 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(match.link, '_blank');
                  }}
                  disabled={match.status === 'encerrada'}
                  title={
                    match.status === 'encerrada'
                      ? 'Partida encerrada'
                      : 'Assistir transmissão'
                  }
                >
                  <Play className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (typeof match.id === 'number') {
                      handleDeleteMatch(match.id);
                    }
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
