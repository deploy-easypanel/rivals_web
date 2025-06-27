'use client';

import ChaveamentoTorneio from '@/components/ChaveamentoTorneio';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProximasPartidas from '@/components/ProximasPartidas';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Gamepad2, MapPin, Medal, Target, Trophy, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PageDucksRivals() {
  const [activeTab, setActiveTab] = useState('home');
  const [timeLeft, setTimeLeft] = useState('');

  const nextTourneyDate = new Date('2025-06-29T14:00:00');

  const updateCountdown = () => {
    const now = new Date();
    const diff = nextTourneyDate.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeLeft('Ao vivo!');
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    setTimeLeft(`${days}d ${hours}h ${minutes}min`);
  };

  useEffect(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const topTeams = [
    { name: 'Ducks Squad', wins: 8, losses: 2, points: 24 },
    { name: 'Fire Eagles', wins: 7, losses: 3, points: 21 },
    { name: 'Storm Riders', wins: 6, losses: 4, points: 18 },
  ];

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="space-y-10 px-6 md:px-12 py-10 bg-gray-100">
        {/* Hero */}
        <section className="bg-gradient-to-r from-orange-600 to-yellow-500 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
          <div>
            <h1 className="text-4xl font-bold mb-2">Ducks Rivals</h1>
            <p className="text-xl mb-1">
              Campeonato Amador de Counter-Strike 2
            </p>
            <p className="text-orange-100 mb-4">
              Finais de semana épicos com os melhores times amadores
            </p>
            <button className="mt-2 px-4 py-2 bg-white text-orange-600 font-bold rounded hover:bg-orange-100 transition">
              Inscrever meu time
            </button>
          </div>

          {/* Contador */}
          <div className="text-center mt-8 md:mt-0 animate-pulse">
            <p className="text-sm text-orange-100">Próximo torneio em</p>
            <p className="text-4xl font-extrabold text-white drop-shadow">
              {timeLeft}
            </p>
          </div>

          <Gamepad2 className="w-24 h-24 text-orange-200 hidden md:block absolute bottom-4 right-4 opacity-20" />
        </section>

        {/* Torneio destaque */}
        <Alert>
          <Trophy className="h-4 w-4" />
          <AlertDescription>
            <strong>Próximo Torneio:</strong> Domingo, 14:00 • Faltam:{' '}
            {timeLeft} • Transmissão via Twitch
          </AlertDescription>
        </Alert>

        {/* Estatísticas rápidas */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Users className="w-6 h-6 text-blue-600" />,
              label: 'Times Cadastrados',
              value: 12,
              border: 'blue-500',
              bg: 'blue-100',
            },
            {
              icon: <Target className="w-6 h-6 text-green-600" />,
              label: 'Jogadores Ativos',
              value: 60,
              border: 'green-500',
              bg: 'green-100',
            },
            {
              icon: <Trophy className="w-6 h-6 text-orange-600" />,
              label: 'Partidas Jogadas',
              value: 48,
              border: 'orange-500',
              bg: 'orange-100',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`flex items-center space-x-4 bg-white rounded-xl shadow-md p-4 border-t-4 border-${stat.border}`}
            >
              <div className={`p-3 rounded-full bg-${stat.bg}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Chaveamento */}
        <ChaveamentoTorneio />

        {/* Grid principal: partidas e chaveamento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProximasPartidas />
        </div>

        {/* Ranking dos times */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Medal className="w-6 h-6 mr-2 text-orange-600" />
            Ranking dos Times
          </h2>
          <div className="space-y-3">
            {topTeams.map((team, index) => (
              <div
                key={team.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0
                        ? 'bg-yellow-500'
                        : index === 1
                        ? 'bg-gray-400'
                        : 'bg-orange-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="font-medium">{team.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{team.points} pts</p>
                  <p className="text-sm text-gray-600">
                    {team.wins}V - {team.losses}D
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Informações do Torneio */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-orange-600" />
            Informações do Torneio
          </h3>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span className="text-gray-600">Local:</span>
              <span className="font-medium">Stream Twitch</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Horário:</span>
              <span className="font-medium">14:00 - 20:00</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Formato:</span>
              <span className="font-medium">Eliminação Simples</span>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
