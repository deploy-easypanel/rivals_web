'use client';

import { Medal } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Team {
  name: string;
  points: number;
  wins: number;
  losses: number;
}

export default function Ranking() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ranking');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTeams(parsed);
        }
      } catch {
        setTeams([]);
      }
    }
  }, []);

  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  return (
    <section className="w-full bg-white rounded-xl shadow-md p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold flex items-center text-orange-600 mb-4">
        <Medal className="w-6 h-6 mr-2" />
        Ranking dos Times
      </h2>
      {sortedTeams.length === 0 ? (
        <p className="text-gray-600">Nenhum time no ranking.</p>
      ) : (
        <div className="space-y-4">
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
      )}
    </section>
  );
}
