import React from 'react';

interface MatchProps {
  team: string;
  score: number;
  winner: boolean;
}

const Match: React.FC<MatchProps> = ({ team, score, winner }) => {
  return (
    <div
      className={`grid grid-cols-2 items-center justify-between w-44 p-2 shadow rounded ${
        winner ? 'bg-green-300' : 'bg-green-200'
      }`}
    >
      <p className="text-xs truncate">{team}</p>
      <p className="text-xs font-bold text-right">{score}</p>
    </div>
  );
};

export default Match;
