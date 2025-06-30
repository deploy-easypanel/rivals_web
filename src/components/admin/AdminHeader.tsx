'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/services/logout';
import {
  LogOut,
  PlusCircle,
  Settings,
  ShieldCheck,
  Trophy,
} from 'lucide-react';

export default function AdminHeader() {
  return (
    <header>
      {/* HEADER */}
      <section className="bg-white border-b shadow-sm  h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          {/* LOGO + TÍTULO */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center shadow-md">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ducks Rivals</h1>
              <p className="text-sm text-gray-500">Painel de Administrador</p>
            </div>
          </div>

          {/* AÇÕES SUPERIORES */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              title="Configurações Gerais"
              className="text-gray-600"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              title="Sair"
              onClick={logout}
              className="text-red-600 hover:text-red-800"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* SUBHEADER */}
      <section className="bg-gray-50 border-b shadow-sm top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-3 items-center">
          <Button
            variant="ghost"
            title="Cadastrar Time (em breve)"
            disabled
            className="flex items-center gap-1 text-gray-400 text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Cadastrar Time</span>
          </Button>

          <Button
            variant="ghost"
            title="Cadastrar Jogador (em breve)"
            disabled
            className="flex items-center gap-1 text-gray-400 text-sm"
          >
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Cadastrar Jogador</span>
          </Button>
        </div>
      </section>
    </header>
  );
}
