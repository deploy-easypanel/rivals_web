'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Calendar,
  LogOut,
  Pencil,
  PlusCircle,
  Settings,
  ShieldCheck,
  Trophy,
} from 'lucide-react';
import { useState } from 'react';

export default function AdminHeader() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('Ducks Rivals');
  const [subtitle, setSubtitle] = useState('Campeonato CS2');
  const [date, setDate] = useState('28/07/2025');
  const [time, setTime] = useState('18:00');

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
              {isEditing ? (
                <>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-xl font-bold text-gray-900"
                  />
                  <Input
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="text-sm text-gray-500 mt-1"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                  <p className="text-sm text-gray-500">{subtitle}</p>
                </>
              )}
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
              className="text-red-600 hover:text-red-800"
              onClick={() => console.log('Logout')}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* SUBHEADER */}
      <section className="bg-gray-50 border-b shadow-sm top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-3 items-center">
          {/* Data e hora */}
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm">
            <Calendar className="w-4 h-4 text-orange-600" />
            {isEditing ? (
              <>
                <Input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-24 h-8 text-sm"
                />
                <Input
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-20 h-8 text-sm"
                />
              </>
            ) : (
              <span className="text-sm font-medium text-gray-700">
                {date} • {time}
              </span>
            )}
          </div>

          {/* Botões de ação */}
          <Button
            variant="ghost"
            onClick={() => setIsEditing(!isEditing)}
            title="Editar informações"
            className="flex items-center gap-1 text-sm"
          >
            <Pencil className="w-4 h-4" />
            <span className="hidden sm:inline">Editar Info</span>
          </Button>

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
