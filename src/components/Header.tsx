// components/Header.tsx
import { Trophy } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ducks Rivals</h1>
              <p className="text-sm text-gray-600">Campeonato CS2</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'home'
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => setActiveTab('navigation')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'navigation'
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Funcionalidades
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
