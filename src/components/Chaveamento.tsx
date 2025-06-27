import { Input } from '@/components/ui/input';
import {
  Crown,
  Hash,
  Pen,
  RotateCcw,
  ShieldCheck,
  Swords,
  Trophy,
  User,
} from 'lucide-react';
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

export default function ChaveamentoTorneio() {
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

  useEffect(() => {
    localStorage.setItem('torneio', JSON.stringify(torneio));
  }, [torneio]);

  const resetarTorneio = () => {
    localStorage.removeItem('torneio');
    setTorneio(defaultState);
  };

  const handleInput = (
    fase: 'quartas' | 'semifinais' | 'final',
    idx: number,
    key: string,
    campo: string,
    valor: string | number
  ) => {
    setTorneio((prev) => {
      const copia: TorneioState = JSON.parse(JSON.stringify(prev));
      const val = campo === 'placar' ? Number(valor) : valor;

      const setCor = (scoreA: number, scoreB: number) => {
        if (scoreA > scoreB) return ['green', 'yellow'];
        if (scoreB > scoreA) return ['yellow', 'green'];
        return ['gray', 'gray'];
      };

      if (fase === 'quartas') {
        const jogo = copia.quartas[idx];
        if (campo === 'placar' && typeof val === 'number') {
          (jogo[key as keyof Jogo] as Time).placar = val;
        } else if (campo === 'nome' && typeof val === 'string') {
          (jogo[key as keyof Jogo] as Time).nome = val;
        }

        const { timeA, timeB } = jogo;
        const [corA, corB] = setCor(timeA.placar, timeB.placar);
        timeA.cor = corA as CorType;
        timeB.cor = corB as CorType;

        const vencedor =
          timeA.placar > timeB.placar
            ? timeA
            : timeB.placar > timeA.placar
            ? timeB
            : null;

        copia.semifinais[idx] = vencedor
          ? {
              time: vencedor.nome,
              placar: copia.semifinais[idx].placar || 0,
              cor: 'green',
            }
          : { time: '', placar: 0, cor: 'gray' };
      }

      if (fase === 'semifinais') {
        const semi = copia.semifinais[idx];
        if (campo === 'placar' && typeof val === 'number') {
          semi.placar = val;
        } else if (campo === 'time' && typeof val === 'string') {
          semi.time = val;
        }

        const [sf1, sf2] = copia.semifinais;
        const [cor1, cor2] = setCor(sf1.placar, sf2.placar);
        sf1.cor = cor1 as CorType;
        sf2.cor = cor2 as CorType;

        const vencedor =
          sf1.placar > sf2.placar ? sf1 : sf2.placar > sf1.placar ? sf2 : null;

        copia.final = vencedor
          ? {
              time: vencedor.time,
              placar: copia.final.placar || 0,
              cor: 'green',
            }
          : { time: '', placar: 0, cor: 'gray' };
      }

      if (fase === 'final') {
        const final = copia.final;
        if (campo === 'placar' && typeof val === 'number') {
          final.placar = val;
        } else if (campo === 'time' && typeof val === 'string') {
          final.time = val;
        }

        final.cor = final.time && final.placar > 0 ? 'green' : 'gray';
      }

      return copia;
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* FORMULÁRIO */}
      <section className="w-full md:w-[30%] bg-white rounded-xl shadow-md p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-orange-600 flex items-center">
            <Pen className="w-4 h-4 mr-2" />
            Gerenciar Chaveamento
          </h3>
          <button
            onClick={resetarTorneio}
            className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
            title="Resetar Torneio"
          >
            <RotateCcw className="w-5 h-5" />
            Resetar
          </button>
        </div>

        {/* Quartas */}
        <div className="space-y-6">
          {torneio.quartas.map((jogo, idx) => (
            <div key={idx} className="space-y-3">
              {(['timeA', 'timeB'] as const).map((key) => (
                <div key={key} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-1/2">
                    <User className="w-5 h-5 text-gray-400" />
                    <Input
                      value={jogo[key].nome}
                      onChange={(e) =>
                        handleInput('quartas', idx, key, 'nome', e.target.value)
                      }
                      placeholder="Nome do time"
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center gap-2 w-20">
                    <Hash className="w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      min={0}
                      value={jogo[key].placar}
                      onChange={(e) =>
                        handleInput(
                          'quartas',
                          idx,
                          key,
                          'placar',
                          e.target.value
                        )
                      }
                      placeholder="0"
                      className="w-full text-center"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Semifinais */}
        <div className="space-y-4">
          {torneio.semifinais.map((sf, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="flex items-center gap-2 w-1/2">
                <User className="w-5 h-5 text-gray-400" />
                <Input
                  value={sf.time}
                  onChange={(e) =>
                    handleInput('semifinais', idx, '', 'time', e.target.value)
                  }
                  placeholder="Semi-finalista"
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-2 w-20">
                <Hash className="w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  min={0}
                  value={sf.placar}
                  onChange={(e) =>
                    handleInput('semifinais', idx, '', 'placar', e.target.value)
                  }
                  placeholder="0"
                  className="w-full text-center"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VISUAL */}
      <section className="w-full bg-white rounded-xl shadow-md p-6 overflow-x-auto">
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
    </div>
  );
}
