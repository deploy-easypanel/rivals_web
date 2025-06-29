import { Clock, FileText, LayoutList, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TorneioData {
  local: string;
  data: string;
  horario: string;
  formato: string;
  equipes: string;
  regulamento: string;
}

export default function TorneioInfo() {
  const [data, setData] = useState<TorneioData>({
    local: '',
    horario: '',
    formato: '',
    data: '',
    equipes: '',
    regulamento: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('torneio_info');
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {}
    }
  }, []);

  return (
    <section className="relative rounded-xl shadow-md w-full overflow-hidden ring-1 ring-orange-200">
      <div className="absolute inset-0 z-0">
        {/* <Image
          src="/bg-cs.jpg"
          alt="Fundo CS2"
          fill
          className="object-cover opacity-20"
        /> */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-orange-50/80 to-white/90" />
      </div>

      <div className="relative z-10 p-6 space-y-8">
        <div className="flex items-center justify-between border-b border-orange-300 pb-3">
          <h3 className="text-2xl font-bold text-orange-600 flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            Informações do Torneio
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
          <InfoItem icon={<MapPin />} label="Local">
            {data.local || 'A definir'}
          </InfoItem>
          <InfoItem icon={<Clock />} label="Data e Horário">
            <div className="flex flex-col sm:flex-row gap-2">
              {data.data || 'A definir'}
              <span>•</span>
              {data.horario || 'A definir'}
            </div>
          </InfoItem>
          <InfoItem icon={<LayoutList />} label="Formato">
            {data.formato || 'A definir'}
          </InfoItem>
          <InfoItem icon={<FileText />} label="Regulamento">
            {data.regulamento ? (
              <a
                href={data.regulamento}
                target="_blank"
                rel="noreferrer"
                className="underline text-blue-600"
              >
                Ver
              </a>
            ) : (
              'A definir'
            )}
          </InfoItem>
        </div>
      </div>
    </section>
  );
}

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 text-orange-600">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-900">{label}</h4>
        <p className="text-gray-700">{children}</p>
      </div>
    </div>
  );
}
