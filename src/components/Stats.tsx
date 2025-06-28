'use client';

import { clsx } from 'clsx';
import { Target, Trophy, Users } from 'lucide-react';
import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  color: 'blue' | 'green' | 'orange';
}

const colorMap = {
  blue: {
    border: 'border-blue-500',
    bg: 'bg-blue-100',
  },
  green: {
    border: 'border-green-500',
    bg: 'bg-green-100',
  },
  orange: {
    border: 'border-orange-500',
    bg: 'bg-orange-100',
  },
};

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colors = colorMap[color];

  return (
    <div
      className={clsx(
        'flex items-center gap-4 bg-white rounded-xl shadow-md p-4 border-t-4 transition-transform hover:scale-[1.02]',
        colors.border
      )}
    >
      <div className={clsx('p-3 rounded-full', colors.bg)} aria-hidden="true">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-extrabold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default function Stats() {
  const stats = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" aria-label="Times" />,
      label: 'Times Cadastrados',
      value: 4,
      color: 'blue' as const,
    },
    {
      icon: (
        <Target className="w-6 h-6 text-green-600" aria-label="Jogadores" />
      ),
      label: 'Jogadores Ativos',
      value: 20,
      color: 'green' as const,
    },
    {
      icon: (
        <Trophy className="w-6 h-6 text-orange-600" aria-label="Partidas" />
      ),
      label: 'Partidas Jogadas',
      value: 20,
      color: 'orange' as const,
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <StatCard
          key={i}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          color={stat.color}
        />
      ))}
    </section>
  );
}
