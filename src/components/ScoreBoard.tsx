import React from 'react';
import { useGame } from '../context/GameContext';
import PlayerCard from './PlayerCard';

const ScoreBoard: React.FC = () => {
  const { players } = useGame();

  if (players.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl mt-8 border border-gray-700">
        <p className="text-xl text-gray-400">¡Aún no hay jugadores! Añade algunos para empezar a jugar dominó.</p>
      </div>
    );
  }

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 justify-items-center">
      {sortedPlayers.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
};

export default ScoreBoard;