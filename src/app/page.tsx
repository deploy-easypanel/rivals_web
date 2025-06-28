'use client';

import Banner from '@/components/Banner';
import Chaveamento from '@/components/Chaveamento';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Partidas from '@/components/Partidas';
import Stats from '@/components/Stats';
import TorneioInfo from '@/components/TorneioInfo';
import { Medal } from 'lucide-react';

const topTeams = [
  { name: 'Ducks Squad', wins: 8, losses: 2, points: 24 },
  { name: 'Fire Eagles', wins: 7, losses: 3, points: 21 },
  { name: 'Storm Riders', wins: 6, losses: 4, points: 18 },
];

export default function PageDucksRivals() {
  return (
    <>
      <Header />
      <main className="space-y-10 px-6 md:px-12 py-10 bg-gray-100">
        <Banner />
        <Stats />
        <TorneioInfo />
        <Chaveamento />
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
      </main>
      <Footer />
    </>
  );
}
