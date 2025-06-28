import React from 'react';

interface MatchProps {
  number: number;
  team: string;
  score: number;
  winner: boolean;
}

export const AdminMatch: React.FC<MatchProps> = ({
  number,
  team,
  score,
  winner,
}) => {
  return (
    <div
      className={`grid grid-cols-3 items-center justify-between w-44 p-2 shadow rounded ${
        winner ? 'bg-orange-200' : 'bg-yellow-200'
      }`}
    >
      <p className="text-xs text-left">#{number}</p>
      <p className="text-xs">{team}</p>
      <p className="text-xs font-bold text-right">{score}</p>
    </div>
  );
};
