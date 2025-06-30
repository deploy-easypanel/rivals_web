'use client';

import { Button } from '@/components/ui/button';
import { Activity, Calendar, CheckCircle, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

type Match = {
  id: number;
  team1: string;
  team2: string;
  time: string;
  date: string;
  link: string;
  status: 'ao vivo' | 'encerrada';
};

export default function Partidas() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('ducksgaming_partidas');
    if (stored) {
      try {
        setMatches(JSON.parse(stored));
      } catch {
        setMatches([]);
      }
    }
  }, []);

  return (
    <section className="w-full bg-white rounded-xl shadow-md p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold flex items-center text-orange-600 mb-4">
        <Calendar className="w-6 h-6 mr-2" />
        Partidas do Torneio
      </h2>

      {matches.length === 0 ? (
        <p className="text-gray-500 text-center">Nenhuma partida disponível.</p>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className={`flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl shadow-sm transition-all
              ${match.status === 'ao vivo' ? 'bg-green-100' : 'bg-gray-100'}`}
            >
              <div>
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
                    <Activity className="w-5 h-5 text-green-600" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-gray-600" />
                  )}
                  {match.status === 'ao vivo' ? 'AO VIVO' : 'Encerrada'}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <Button
                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                  onClick={() => window.open(match.link, '_blank')}
                  disabled={match.status === 'encerrada'}
                  title={
                    match.status === 'encerrada'
                      ? 'Partida encerrada'
                      : 'Assistir transmissão'
                  }
                >
                  <Play className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
