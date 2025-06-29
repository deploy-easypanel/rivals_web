'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Hash,
  Medal,
  PencilLine,
  Plus,
  RotateCcw,
  ShieldOff,
  Star,
  Swords,
  Trash2,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Team {
  name: string;
  points: number;
  wins: number;
  losses: number;
}

export default function AdminRanking() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ranking');
    if (saved) {
      try {
        setTeams(JSON.parse(saved));
      } catch {
        setTeams([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ranking', JSON.stringify(teams));
  }, [teams]);

  const updateTeam = (index: number, field: keyof Team, value: string) => {
    setTeams((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: field === 'name' ? value : Math.max(0, parseInt(value) || 0),
      };
      return updated;
    });
  };

  const addTeam = () => {
    setTeams((prev) => [...prev, { name: '', points: 0, wins: 0, losses: 0 }]);
  };

  const deleteTeam = (index: number) => {
    setTeams((prev) => prev.filter((_, i) => i !== index));
  };

  const resetRanking = () => {
    if (confirm('Deseja realmente resetar o ranking?')) {
      setTeams([]);
      localStorage.removeItem('ranking');
    }
  };

  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Bloco de Edição */}
      <section className="w-full md:w-[40%] bg-white rounded-xl shadow-md p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center text-orange-600">
            <PencilLine className="w-5 h-5 mr-2" />
            Editar Ranking
          </h2>
          <div className="flex gap-2">
            <Button
              onClick={addTeam}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Novo Time
            </Button>
            <Button
              onClick={resetRanking}
              variant="destructive"
              className="px-3 py-1 text-sm"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Resetar
            </Button>
          </div>
        </div>

        {teams.map((team, index) => (
          <div
            key={index}
            className="space-y-3 bg-gray-50 rounded-lg p-4 shadow-inner relative"
          >
            <button
              onClick={() => deleteTeam(index)}
              title="Remover time"
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">
                Time {index + 1}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <Input
                  value={team.name}
                  onChange={(e) => updateTeam(index, 'name', e.target.value)}
                  placeholder="Nome"
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <Input
                  type="number"
                  min={0}
                  value={team.points}
                  onChange={(e) => updateTeam(index, 'points', e.target.value)}
                  className="w-full"
                  placeholder="Pontos"
                />
              </div>
              <div className="flex items-center gap-2">
                <Swords className="w-4 h-4 text-green-600" />
                <Input
                  type="number"
                  min={0}
                  value={team.wins}
                  onChange={(e) => updateTeam(index, 'wins', e.target.value)}
                  className="w-full"
                  placeholder="Vitórias"
                />
              </div>
              <div className="flex items-center gap-2">
                <ShieldOff className="w-4 h-4 text-red-500" />
                <Input
                  type="number"
                  min={0}
                  value={team.losses}
                  onChange={(e) => updateTeam(index, 'losses', e.target.value)}
                  className="w-full"
                  placeholder="Derrotas"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Bloco Visual */}
      <section className="w-full bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center text-orange-600">
          <Medal className="w-6 h-6 mr-2" />
          Ranking dos Times
        </h2>
        <div className="space-y-3">
          {sortedTeams.map((team, index) => (
            <div
              key={team.name + index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0
                      ? 'bg-yellow-500'
                      : index === 1
                      ? 'bg-gray-400'
                      : index === 2
                      ? 'bg-orange-600'
                      : 'bg-gray-300'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="font-medium text-gray-800">{team.name}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-700">{team.points} pts</p>
                <p className="text-sm text-gray-500">
                  {team.wins}V - {team.losses}D
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
