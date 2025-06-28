'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { Gamepad2, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BannerProps {
  dataTorneio: Date;
}

export default function AdminBanner({ dataTorneio }: BannerProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = dataTorneio.getTime() - now;

      if (distance <= 0) {
        setTimeLeft('Agora!');
        return;
      }

      const dias = Math.floor(distance / (1000 * 60 * 60 * 24));
      const horas = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((distance / (1000 * 60)) % 60);
      const segundos = Math.floor((distance / 1000) % 60);

      const formatado = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
      setTimeLeft(formatado);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [dataTorneio]);

  return (
    <>
      {/* Banner principal */}
      <section className="bg-gradient-to-r from-orange-600 to-yellow-500 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        <div>
          <h1 className="text-4xl font-bold mb-2">Ducks Rivals</h1>
          <p className="text-xl mb-1">Campeonato Amador de Counter-Strike</p>
          <p className="text-orange-100 mb-4">
            Finais de semana épicos com os melhores times amadores
          </p>
        </div>

        <div className="text-center mt-8 md:mt-0 animate-pulse">
          <p className="text-sm text-orange-100">Próximo torneio em</p>
          <p className="text-4xl font-extrabold text-white drop-shadow">
            {timeLeft}
          </p>
        </div>

        <Gamepad2 className="w-24 h-24 text-orange-200 hidden md:block absolute bottom-4 right-4 opacity-20" />
      </section>

      {/* Alerta destaque */}
      <Alert className="bg-orange-50 text-orange-900 border-orange-200 mt-4">
        <Trophy className="h-4 w-4 text-orange-600" />
        <AlertDescription>
          <div className="flex flex-wrap items-center gap-2">
            <strong>Próximo Torneio:</strong>
            {format(dataTorneio, "EEEE',' HH:mm", { locale: ptBR })} • Faltam:
            <span className="font-semibold text-orange-700">{timeLeft}</span> •
            Transmissão via{' '}
            <a
              href="https://twitch.tv/ducksgamingoficial"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-purple-600 hover:text-purple-800"
            >
              Twitch
            </a>
          </div>
        </AlertDescription>
      </Alert>
    </>
  );
}
