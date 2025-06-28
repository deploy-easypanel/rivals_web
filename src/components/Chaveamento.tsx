'use client';

import { Crown, ShieldCheck, Swords, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

type CorType = 'green' | 'yellow' | 'gray';

interface Time {
  nome: string;
  placar: number;
  cor: CorType;
}

interface Jogo {
  timeA: Time;
  timeB: Time;
}

interface TimeSimples {
  time: string;
  placar: number;
  cor: CorType;
}

interface TorneioState {
  quartas: Jogo[];
  semifinais: TimeSimples[];
  final: TimeSimples;
}

const defaultState: TorneioState = {
  quartas: [
    {
      timeA: { nome: 'Time A', placar: 0, cor: 'gray' },
      timeB: { nome: 'Time B', placar: 0, cor: 'gray' },
    },
    {
      timeA: { nome: 'Time C', placar: 0, cor: 'gray' },
      timeB: { nome: 'Time D', placar: 0, cor: 'gray' },
    },
  ],
  semifinais: [
    { time: '', placar: 0, cor: 'gray' },
    { time: '', placar: 0, cor: 'gray' },
  ],
  final: { time: '', placar: 0, cor: 'gray' },
};

const bgTextColors: Record<CorType, string> = {
  green: 'bg-green-100 text-green-700',
  yellow: 'bg-yellow-50 text-yellow-600',
  gray: 'bg-gray-50 text-gray-600',
};

const iconColors: Record<CorType, string> = {
  green: 'text-green-500',
  yellow: 'text-yellow-500',
  gray: 'text-gray-500',
};

export default function Chaveamento() {
  const [torneio, setTorneio] = useState<TorneioState>(defaultState);

  useEffect(() => {
    const salvo = localStorage.getItem('torneio');
    if (salvo) {
      try {
        const parsed = JSON.parse(salvo);
        setTorneio(parsed);
      } catch {
        setTorneio(defaultState);
      }
    }
  }, []);

  return (
    <section className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-orange-600">
        <Trophy className="w-5 h-5" /> Chaveamento do Torneio
      </h3>

      <div className="grid grid-cols-3 gap-x-16 min-w-[700px]">
        {/* Quartas */}
        <div className="space-y-16">
          {torneio.quartas.map((jogo, idx) => (
            <div key={idx} className="space-y-2">
              {[jogo.timeA, jogo.timeB].map((time, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between ${
                    bgTextColors[time.cor]
                  } p-3 rounded-lg shadow`}
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck
                      className={`w-4 h-4 ${iconColors[time.cor]}`}
                    />
                    {time.nome}
                  </span>
                  <span className="font-bold">{time.placar}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Semifinais */}
        <div className="flex flex-col justify-around py-8 space-y-2">
          {torneio.semifinais.map((sf, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between ${
                bgTextColors[sf.cor]
              } p-3 rounded-lg shadow`}
            >
              <span className="flex items-center gap-2">
                <Swords className={`w-4 h-4 ${iconColors[sf.cor]}`} />
                {sf.time}
              </span>
              <span className="font-bold">{sf.placar}</span>
            </div>
          ))}
        </div>

        {/* Final */}
        <div className="flex flex-col justify-center space-y-2">
          <div
            className={`flex items-center justify-between border p-4 rounded-lg shadow ${
              torneio.final.cor === 'green'
                ? 'bg-green-100 border-green-300 text-green-800'
                : 'bg-gray-100 border-gray-300 text-gray-600'
            }`}
          >
            <span className="flex items-center gap-2 font-bold">
              <Crown className={`w-5 h-5 ${iconColors[torneio.final.cor]}`} />
              {torneio.final.time}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
