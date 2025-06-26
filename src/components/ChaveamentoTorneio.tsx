import { Crown, ShieldCheck, Swords, Trophy } from 'lucide-react';
import { useState } from 'react';

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
  const [torneio, setTorneio] = useState<TorneioState>({
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
  });

  const handleInput = (
    fase: string,
    idx: number,
    key: string,
    campo: string,
    valor: string | number
  ) => {
    setTorneio((prev) => {
      const copia = JSON.parse(JSON.stringify(prev));
      const val = campo === 'placar' ? parseInt(String(valor)) : valor;

      if (fase === 'quartas') {
        copia.quartas[idx][key][campo] = val;

        const jogo = copia.quartas[idx];
        const scoreA = jogo.timeA.placar;
        const scoreB = jogo.timeB.placar;

        if (
          typeof scoreA === 'number' &&
          typeof scoreB === 'number' &&
          scoreA !== scoreB
        ) {
          const vencedor = scoreA > scoreB ? jogo.timeA : jogo.timeB;

          jogo.timeA.cor = scoreA > scoreB ? 'green' : 'yellow';
          jogo.timeB.cor = scoreB > scoreA ? 'green' : 'yellow';

          copia.semifinais[idx] = {
            time: vencedor.nome,
            placar: copia.semifinais[idx].placar ?? 0,
            cor: 'green',
          };
        } else {
          jogo.timeA.cor = 'gray';
          jogo.timeB.cor = 'gray';
          copia.semifinais[idx] = {
            time: '',
            placar: 0,
            cor: 'gray',
          };
        }
      } else if (fase === 'semifinais') {
        copia.semifinais[idx][campo] = val;

        const sf1 = copia.semifinais[0];
        const sf2 = copia.semifinais[1];
        const p1 = sf1.placar;
        const p2 = sf2.placar;

        if (typeof p1 === 'number' && typeof p2 === 'number' && p1 !== p2) {
          const vencedor = p1 > p2 ? sf1 : sf2;

          copia.semifinais[0].cor = sf1 === vencedor ? 'green' : 'yellow';
          copia.semifinais[1].cor = sf2 === vencedor ? 'green' : 'yellow';

          copia.final = {
            time: vencedor.time,
            placar: copia.final.placar ?? 0,
            cor: 'green',
          };
        } else {
          copia.semifinais[0].cor = 'gray';
          copia.semifinais[1].cor = 'gray';
          copia.final = { time: '', placar: 0, cor: 'gray' };
        }
      } else if (fase === 'final') {
        copia.final[campo] = val;
      }

      return copia;
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* FORMULÁRIO */}
      <div className="w-full md:w-1/3 bg-white rounded-xl shadow-md p-6 space-y-6">
        <h2 className="text-lg font-semibold text-orange-600">Editar Jogos</h2>

        {/* Quartas */}
        {torneio.quartas.map((jogo, idx) => (
          <div key={idx} className="space-y-2">
            {(['timeA', 'timeB'] as const).map((key) => (
              <div key={key} className="flex items-center gap-2">
                <input
                  type="text"
                  className="border rounded p-1 w-1/2"
                  value={jogo[key].nome}
                  onChange={(e) =>
                    handleInput('quartas', idx, key, 'nome', e.target.value)
                  }
                />
                <input
                  type="number"
                  className="border rounded p-1 w-20"
                  min={0}
                  value={jogo[key].placar}
                  onChange={(e) =>
                    handleInput('quartas', idx, key, 'placar', e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        ))}

        {/* Semifinais */}
        {torneio.semifinais.map((sf, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              className="border rounded p-1 w-1/2"
              value={sf.time}
              onChange={(e) =>
                handleInput('semifinais', idx, '', 'time', e.target.value)
              }
            />
            <input
              type="number"
              className="border rounded p-1 w-20"
              min={0}
              value={sf.placar}
              onChange={(e) =>
                handleInput('semifinais', idx, '', 'placar', e.target.value)
              }
            />
          </div>
        ))}

        {/* Final */}
        <div className="flex items-center gap-2">
          <input
            className="border rounded p-1 w-1/2"
            value={torneio.final.time}
            onChange={(e) =>
              handleInput('final', 0, '', 'time', e.target.value)
            }
          />
          <input
            type="number"
            className="border rounded p-1 w-20"
            min={0}
            value={torneio.final.placar}
            onChange={(e) =>
              handleInput('final', 0, '', 'placar', e.target.value)
            }
          />
        </div>
      </div>

      {/* CHAVEAMENTO VISUAL */}
      <section className="w-full bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-orange-600">
          <Trophy className="w-5 h-5" /> Chaveamento do Torneio
        </h3>

        <div className="grid grid-cols-3 gap-x-16 min-w-[700px]">
          {/* Quartas */}
          <div className="space-y-16">
            {torneio.quartas.map((jogo, idx) => {
              const a = jogo.timeA;
              const b = jogo.timeB;

              return (
                <div key={idx} className="space-y-2">
                  {[a, b].map((time, i) => (
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
              );
            })}
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
                  <Swords className={`w-4 h-4 ${iconColors[sf.cor]}`} />{' '}
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
                <Crown
                  className={`w-5 h-5 ${
                    iconColors[torneio.final.cor] || 'text-gray-500'
                  }`}
                />
                {torneio.final.time}
              </span>
              <span className="text-xl font-extrabold">
                {torneio.final.placar}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
