import { Trophy } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Trophy className="w-6 h-6 text-orange-500" />
          <span className="text-xl font-bold">Ducks Rivals</span>
        </div>
        <p className="text-gray-400">
          Campeonato Amador de Counter-Strike 2 • Finais de semana épicos
        </p>
      </div>
    </footer>
  );
}
