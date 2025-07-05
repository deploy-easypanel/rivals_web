'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { mostrarBanner } from '@/services/banner';
import { BannerData } from '@/types';
import { format, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { Gamepad2, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function UserBanner() {
  const [timeLeft, setTimeLeft] = useState('');

  const [dataTorneio, setDataTorneio] = useState<Date | null>(null);
  const [title, setTitle] = useState('Ducks Rivals');
  const [subtitle, setSubtitle] = useState(
    'Campeonato Amador de Counter-Strike'
  );
  const [paragraph, setParagraph] = useState(
    'Finais de semana épicos com os melhores times amadores'
  );
  const [colorStart, setColorStart] = useState('#f97316');
  const [colorEnd, setColorEnd] = useState('#fbbf24');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ducksgaming_banner_config');
      if (saved) {
        const config = JSON.parse(saved);
        if (config.dataTorneio) setDataTorneio(new Date(config.dataTorneio));
        if (config.title) setTitle(config.title);
        if (config.subtitle) setSubtitle(config.subtitle);
        if (config.colorStart) setColorStart(config.colorStart);
        if (config.colorEnd) setColorEnd(config.colorEnd);
      } else {
        // Se não tiver nada no localStorage, usa default (amanhã)
        setDataTorneio(new Date(Date.now() + 24 * 60 * 60 * 1000));
      }
    } catch {
      setDataTorneio(new Date(Date.now() + 24 * 60 * 60 * 1000));
    }
  }, []);

  useEffect(() => {
    async function fetchBanner() {
      try {
        const data: BannerData = await mostrarBanner();

        if (data.data_torneio) setDataTorneio(new Date(data.data_torneio));
        if (data.title) setTitle(data.title);
        if (data.subtitle) setSubtitle(data.subtitle);
        if (data.paragraph !== undefined && data.paragraph !== null) {
          setParagraph(data.paragraph);
        }
        if (data.color_start) setColorStart(data.color_start);
        if (data.color_end) setColorEnd(data.color_end);
      } catch (err) {
        console.error('Erro ao buscar banner:', err);
        setDataTorneio(new Date(Date.now() + 24 * 60 * 60 * 1000)); // fallback para amanhã
      }
    }
    fetchBanner();
  }, []);

  useEffect(() => {
    if (!dataTorneio || !isValid(dataTorneio)) {
      setTimeLeft('');
      return;
    }

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
    <div className="flex flex-col gap-2">
      {/* Banner principal */}
      <section
        className="rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-center relative overflow-hidden"
        style={{
          background: `linear-gradient(to right, ${colorStart}, ${colorEnd})`,
        }}
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-xl mb-1">{subtitle}</p>
          <p className="text-orange-100 mb-4">{paragraph}</p>
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
      <Alert className="bg-orange-50 text-orange-900 border-orange-200">
        <Trophy className="h-4 w-4 text-orange-600" />
        <AlertDescription>
          <div className="flex flex-wrap items-center gap-2">
            <strong>Próximo Torneio:</strong>{' '}
            {dataTorneio && isValid(dataTorneio)
              ? format(dataTorneio, "EEEE',' HH:mm", { locale: ptBR })
              : 'Data inválida'}{' '}
            • Faltam:{' '}
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
    </div>
  );
}
