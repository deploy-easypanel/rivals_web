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
    <section className="bg-orange-50 text-orange-900 border border-orange-200 rounded-xl shadow-xl p-6 overflow-x-auto">
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
          <InfoItem icon={<MapPin />} label="Local">
            {data.local || 'A definir'}
          </InfoItem>
          <InfoItem icon={<Clock />} label="Data e Horário">
            {data.data || 'A definir'}
            <span>•</span>
            {data.horario || 'A definir'}
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
        <p className="flex gap-2 text-gray-700">{children}</p>
      </div>
    </div>
  );
}
