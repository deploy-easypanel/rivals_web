'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { atualizarBanner, mostrarBanner } from '@/services/banner';
import { format, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { Gamepad2, Pencil, Save, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const LOCAL_STORAGE_KEY = 'ducksgaming_banner_config';

export default function AdminBanner() {
  const [timeLeft, setTimeLeft] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  // Carrega do localStorage na inicialização
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const config = JSON.parse(saved);
        if (config.dataTorneio) setDataTorneio(new Date(config.dataTorneio));
        if (config.title) setTitle(config.title);
        if (config.subtitle) setSubtitle(config.subtitle);
        if (config.paragraph) setParagraph(config.paragraph);
        if (config.colorStart) setColorStart(config.colorStart);
        if (config.colorEnd) setColorEnd(config.colorEnd);
      } else {
        setDataTorneio(new Date(Date.now() + 24 * 60 * 60 * 1000)); // 1 dia depois
      }
    } catch {
      setDataTorneio(new Date(Date.now() + 24 * 60 * 60 * 1000));
    }
  }, []);

  useEffect(() => {
    async function loadBanner() {
      try {
        const data = await mostrarBanner();
        setDataTorneio(new Date(data.data_torneio));
        setTitle(data.title);
        setSubtitle(data.subtitle);
        setParagraph(data.paragraph || '');
        setColorStart(data.color_start);
        setColorEnd(data.color_end);
      } catch {
        alert('Erro ao carregar banner');
      }
    }
    loadBanner();
  }, []);

  // Countdown para o torneio
  useEffect(() => {
    if (!dataTorneio || !isValid(dataTorneio)) {
      setTimeLeft('');
      return;
    }

    const updateCountdown = () => {
      const now = Date.now();
      const distance = dataTorneio.getTime() - now;

      if (distance <= 0) {
        setTimeLeft('Agora!');
        return;
      }

      const dias = Math.floor(distance / (1000 * 60 * 60 * 24));
      const horas = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((distance / (1000 * 60)) % 60);
      const segundos = Math.floor((distance / 1000) % 60);

      setTimeLeft(`${dias}d ${horas}h ${minutos}m ${segundos}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [dataTorneio]);

  const formatDateTimeLocal = (date: Date | null): string => {
    if (!date || !isValid(date)) return '';
    const pad = (n: number) => n.toString().padStart(2, '0');

    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes())
    );
  };

  const handleDateChange = (value: string) => {
    const newDate = new Date(value);
    if (isValid(newDate)) setDataTorneio(newDate);
  };

  const handleSave = async () => {
    if (!dataTorneio || !isValid(dataTorneio)) {
      alert('Data inválida');
      return;
    }

    try {
      await atualizarBanner({
        dataTorneio: dataTorneio.toISOString(),
        title,
        subtitle,
        paragraph,
        colorStart,
        colorEnd,
      });
      setIsEditing(false);
    } catch {
      alert('Erro ao salvar');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Edição */}
      <section className="w-full md:w-[30%] bg-white rounded-xl shadow-md p-6 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-orange-600 flex items-center gap-2">
            <Pencil className="w-5 h-5" />
            Editar Banner
          </h2>

          {isEditing ? (
            <Button
              onClick={handleSave}
              title="Salvar alterações"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              title="Editar informações"
            >
              Editar
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Data do Torneio
            </label>
            <Input
              disabled={!isEditing}
              type="datetime-local"
              value={formatDateTimeLocal(dataTorneio)}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Título
            </label>
            <Input
              disabled={!isEditing}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Subtítulo
            </label>
            <Input
              disabled={!isEditing}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Parágrafo
            </label>
            <Textarea
              disabled={!isEditing}
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Cor início
              </label>
              <Input
                disabled={!isEditing}
                type="color"
                value={colorStart}
                onChange={(e) => setColorStart(e.target.value)}
                className="h-10 w-16 p-0"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Cor fim
              </label>
              <Input
                disabled={!isEditing}
                type="color"
                value={colorEnd}
                onChange={(e) => setColorEnd(e.target.value)}
                className="h-10 w-16 p-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="w-full bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <div className="flex flex-col gap-4">
          <section
            className="rounded-2xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-center"
            style={{
              background: `linear-gradient(to right, ${colorStart}, ${colorEnd})`,
            }}
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">{title}</h1>
              <p className="text-xl mb-1">{subtitle}</p>
              <p className="text-orange-100">{paragraph}</p>
            </div>
            <div className="text-center mt-6 md:mt-0 animate-pulse">
              <p className="text-sm text-orange-100">Próximo torneio em</p>
              <p className="text-4xl font-extrabold drop-shadow">{timeLeft}</p>
            </div>
            <Gamepad2 className="w-24 h-24 text-orange-200 hidden md:block absolute bottom-4 right-4 opacity-20" />
          </section>
          <Alert className="bg-orange-50 text-orange-900 border-orange-200">
            <Trophy className="h-4 w-4 text-orange-600" />
            <AlertDescription>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <strong>Próximo Torneio:</strong>{' '}
                {dataTorneio && isValid(dataTorneio)
                  ? format(dataTorneio, "EEEE',' dd/MM • HH:mm", {
                      locale: ptBR,
                    })
                  : 'Data inválida'}{' '}
                • Faltam:{' '}
                <span className="font-semibold text-orange-700">
                  {timeLeft}
                </span>{' '}
                • Transmissão via{' '}
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
      </section>
    </div>
  );
}
