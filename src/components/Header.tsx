'use client';

import { Eye, EyeOff, LogIn, Trophy, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo e Título */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center shadow-md">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  Ducks Rivals
                </h1>
                <p className="text-sm text-gray-500">Campeonato CS2</p>
              </div>
            </div>

            {/* Botão de Login */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-orange-600 hover:bg-orange-700 transition-colors shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <LogIn className="w-5 h-5" />
              Entrar
            </button>
          </div>
        </div>
      </header>

      {/* Modal de Login */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-fade-in">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Entrar</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm text-gray-700 block mb-1"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="exemplo@email.com"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="text-sm text-gray-700 block mb-1"
                >
                  Senha
                </label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Acessar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
