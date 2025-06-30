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
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-700',
  gray: 'bg-gray-100 text-gray-600',
};

const iconColors: Record<CorType, string> = {
  green: 'text-green-500',
  yellow: 'text-yellow-500',
  gray: 'text-gray-500',
};

export default function Chaveamento() {
  const [torneio, setTorneio] = useState<TorneioState>(defaultState);

  useEffect(() => {
    const salvo = localStorage.getItem('ducksgaming_chaveamento');
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
    <section className="bg-white rounded-xl shadow-xl p-6 overflow-x-auto border border-zinc-200">
      <div className="text-2xl font-extrabold mb-8 text-orange-600 flex items-center gap-3">
        <Trophy className="w-7 h-7 text-orange-600" />
        Chaveamento do Torneio
      </div>

      <div className="grid grid-cols-3 gap-x-16 min-w-[800px]">
        {/* Quartas */}
        <div className="space-y-10">
          {torneio.quartas.map((jogo, idx) => (
            <div key={idx} className="space-y-2">
              {[jogo.timeA, jogo.timeB].map((time, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between ${
                    bgTextColors[time.cor]
                  } p-3 rounded-xl shadow-md transition duration-300`}
                >
                  <span className="flex items-center gap-2 font-medium">
                    <ShieldCheck
                      className={`w-5 h-5 ${iconColors[time.cor]}`}
                    />
                    {time.nome}
                  </span>
                  <span className="text-lg font-bold">{time.placar}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Semifinais */}
        <div className="flex flex-col justify-around space-y-10">
          {torneio.semifinais.map((sf, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between ${
                bgTextColors[sf.cor]
              } p-4 rounded-xl shadow-md`}
            >
              <span className="flex items-center gap-2 font-medium">
                <Swords className={`w-5 h-5 ${iconColors[sf.cor]}`} />
                {sf.time}
              </span>
              <span className="text-lg font-bold">{sf.placar}</span>
            </div>
          ))}
        </div>

        {/* Final */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-sm text-orange-700 font-semibold mb-2">
            CAMPEÃO
          </p>
          <div
            className={`flex items-center justify-between w-full max-w-sm p-5 rounded-xl shadow-lg border-2 ${
              torneio.final.cor === 'green'
                ? 'bg-green-50 border-green-400 text-green-800'
                : 'bg-gray-100 border-gray-300 text-gray-600'
            }`}
          >
            <span className="flex items-center gap-2 font-bold text-xl">
              <Crown className={`w-6 h-6 ${iconColors[torneio.final.cor]}`} />
              {torneio.final.time}
            </span>
            <span className="text-2xl font-extrabold">
              {torneio.final.placar}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
