import { Button } from '@/components/ui/button';
import { Calendar, Play } from 'lucide-react';

const upcomingMatches = [
  {
    id: 1,
    team1: 'Ducks Squad',
    team2: 'Rivals Pro',
    time: '14:00',
    date: 'Sábado',
    link: 'https://twitch.tv/ducksgamingoficial',
  },
  {
    id: 2,
    team1: 'Fire Eagles',
    team2: 'Storm Riders',
    time: '16:00',
    date: 'Sábado',
    link: 'https://twitch.tv/ducksgamingoficial',
  },
  {
    id: 3,
    team1: 'Night Hawks',
    team2: 'Cyber Wolves',
    time: '18:00',
    date: 'Domingo',
    link: 'https://twitch.tv/ducksgamingoficial',
  },
];

export default function ProximasPartidas() {
  return (
    <section className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Calendar className="w-6 h-6 mr-2 text-orange-600" />
        Próximas Partidas
      </h2>
      <div className="space-y-4">
        {upcomingMatches.map((match) => (
          <div
            key={match.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">{match.date}</p>
                <p className="font-semibold text-orange-600">{match.time}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{match.team1}</span>
                <span className="text-gray-400">vs</span>
                <span className="font-medium">{match.team2}</span>
              </div>
            </div>
            <Button
              className="flex items-center space-x-2 bg-green-300 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => window.open(match.link, '_blank')}
            >
              <Play className="w-5 h-5 text-green-200" />
              <span>Assistir</span>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
