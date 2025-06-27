'use client';

import Banner from '@/components/Banner';
import Chaveamento from '@/components/Chaveamento';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Partidas from '@/components/Partidas';
import { MapPin, Medal, Target, Trophy, Users } from 'lucide-react';
import { useState } from 'react';

const topTeams = [
  { name: 'Ducks Squad', wins: 8, losses: 2, points: 24 },
  { name: 'Fire Eagles', wins: 7, losses: 3, points: 21 },
  { name: 'Storm Riders', wins: 6, losses: 4, points: 18 },
];

export default function PageDucksRivals() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="space-y-10 px-6 md:px-12 py-10 bg-gray-100">
        {/* Banner */}
        <Banner dataTorneio={new Date('2025-06-30T14:00:00')} />

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
        <Chaveamento />

        {/* Partidas */}
        <Partidas />

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
