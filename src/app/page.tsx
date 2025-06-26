'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Match from '@/components/Match';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Calendar,
  Gamepad2,
  MapPin,
  Play,
  Star,
  Target,
  Trophy,
  Users,
} from 'lucide-react';
import { useState } from 'react';

export default function PageDucksRivals() {
  const [activeTab, setActiveTab] = useState('home');
  // Mock data
  const upcomingMatches = [
    {
      id: 1,
      team1: 'Ducks Squad',
      team2: 'Rivals Pro',
      time: '14:00',
      date: 'Sábado',
    },
    {
      id: 2,
      team1: 'Fire Eagles',
      team2: 'Storm Riders',
      time: '16:00',
      date: 'Sábado',
    },
    {
      id: 3,
      team1: 'Night Hawks',
      team2: 'Cyber Wolves',
      time: '18:00',
      date: 'Domingo',
    },
  ];

  const topTeams = [
    { name: 'Ducks Squad', wins: 8, losses: 2, points: 24 },
    { name: 'Fire Eagles', wins: 7, losses: 3, points: 21 },
    { name: 'Storm Riders', wins: 6, losses: 4, points: 18 },
  ];

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="space-y-8 p-11">
        <div className="bg-gradient-to-r from-orange-600 to-yellow-500 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Ducks Rivals</h1>
              <p className="text-xl mb-4">
                Campeonato Amador de Counter-Strike 2
              </p>
              <p className="text-orange-100">
                Finais de semana épicos com os melhores times amadores
              </p>
            </div>
            <Gamepad2 className="w-24 h-24 text-orange-200" />
          </div>
        </div>

        {/* Tournament Info */}
        <Alert>
          <Trophy className="h-4 w-4" />
          <AlertDescription>
            <strong>Próximo Torneio:</strong> Este final de semana • Premiação:
            R$ 1.500 • Local: Stream no Twitch
          </AlertDescription>
        </Alert>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div
            className={`flex items-center space-x-4 bg-white rounded-xl shadow-md p-4 border-t-4 border-blue-500`}
          >
            <div className={`p-3 rounded-full bg-blue-100`}>
              <Users className={`w-6 h-6 text-blue-600`} />
            </div>
            <div>
              <p className="text-lg font-bold">12</p>
              <p className="text-gray-600">Times Cadastrados</p>
            </div>
          </div>
          <div
            className={`flex items-center space-x-4 bg-white rounded-xl shadow-md p-4 border-t-4 border-green-500`}
          >
            <div className={`p-3 rounded-full bg-green-100`}>
              <Target className={`w-6 h-6 text-green-600`} />
            </div>
            <div>
              <p className="text-lg font-bold">60</p>
              <p className="text-gray-600">Jogadores Ativos</p>
            </div>
          </div>
          <div
            className={`flex items-center space-x-4 bg-white rounded-xl shadow-md p-4 border-t-4 border-orange-500`}
          >
            <div className={`p-3 rounded-full bg-orange-100`}>
              <Trophy className={`w-6 h-6 text-orange-600`} />
            </div>
            <div>
              <p className="text-lg font-bold">48</p>
              <p className="text-gray-600">Partidas Jogadas</p>
            </div>
          </div>
        </div>

        {/* Upcoming Matches */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-orange-600" />
            Próximas Partidas
          </h2>
          <div className="space-y-4">
            {upcomingMatches.map((match) => (
              <div
                key={match.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{match.date}</p>
                    <p className="font-semibold text-orange-600">
                      {match.time}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{match.team1}</span>
                    <span className="text-gray-400">vs</span>
                    <span className="font-medium">{match.team2}</span>
                  </div>
                </div>
                <Play className="w-5 h-5 text-green-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Top Teams */}
        {/* <div className="bg-white rounded-xl shadow-md p-6">
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
        </div> */}

        {/* Tournament Info Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-orange-600" />
              Informações do Torneio
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Local:</span>
                <span className="font-medium">Stream Twitch</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Horário:</span>
                <span className="font-medium">14:00 - 20:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Formato:</span>
                <span className="font-medium">Eliminação Simples</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-orange-600" />
              Premiação
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">🥇 1º Lugar:</span>
                <span className="font-bold text-yellow-600">R$ 800</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">🥈 2º Lugar:</span>
                <span className="font-bold text-gray-500">R$ 500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">🥉 3º Lugar:</span>
                <span className="font-bold text-orange-600">R$ 200</span>
              </div>
            </div>
          </div>

          {/* Tournament Bracket Table */}
          <section
            id="chaveamento"
            className="bg-white rounded-xl shadow-md relative overflow-x-auto py-10 px-4"
          >
            <h2 className="text-2xl font-bold mb-10 text-orange-600">
              Chaveamento do Torneio
            </h2>

            <div className="grid grid-cols-3 gap-x-32 min-w-full relative">
              {/* Quartas de final */}
              <div id="semi-final" className="space-y-24 relative">
                <div className="space-y-2">
                  <Match number={0} team="" score={0} winner={false} />
                  <Match number={0} team="" score={0} winner={true} />
                </div>
                <div className="space-y-2">
                  <Match number={0} team="" score={0} winner={false} />
                  <Match number={0} team="" score={0} winner={true} />
                </div>
              </div>

              {/* Semifinais */}
              <div
                id="final"
                className="flex flex-col justify-between relative py-14"
              >
                <Match number={0} team="" score={0} winner={false} />
                <Match number={0} team="" score={0} winner={true} />
              </div>

              {/* Final */}
              <div
                id="campeao"
                className="flex flex-col justify-center space-y-2"
              >
                <Match number={0} team="" score={0} winner={true} />
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
