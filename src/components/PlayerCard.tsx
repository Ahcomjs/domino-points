import React, { useState } from 'react';
import type { Player } from '../types';
import { useGame } from '../context/GameContext';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { updatePlayerScore, removePlayer, undoLastScore } = useGame();
  const [pointsInput, setPointsInput] = useState<string>('');

  const handleAddPoints = () => {
    const points = parseInt(pointsInput);
    if (!isNaN(points) && points !== 0) { 
      updatePlayerScore(player.id, points);
      setPointsInput('');
    } else {
        alert('Por favor, ingresa una cantidad de puntos válida (número diferente de 0).');
    }
  };

  const handleUndoLastScore = () => {
    if (confirm(`¿Estás seguro de que quieres deshacer la última puntuación de ${player.name}?`)) {
      undoLastScore(player.id);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddPoints();
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6 m-3 w-full sm:w-64 flex flex-col justify-between transform transition duration-300 hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-indigo-600">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-indigo-400 truncate max-w-[80%]">{player.name}</h3>
          <button
            onClick={() => removePlayer(player.id)}
            className="text-red-500 hover:text-red-700 transition duration-200 p-1 rounded-full hover:bg-red-900"
            title="Eliminar jugador"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        <p className="text-6xl font-extrabold text-white mb-6 text-center">
          {player.score}
        </p>
      </div>

      <div className="mt-4">
        <input
          type="number"
          placeholder="Puntos (+/-)"
          value={pointsInput}
          onChange={(e) => setPointsInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 mb-3 text-center text-lg placeholder-gray-400"
        />
        <div className="flex gap-2">
          <button
            onClick={handleAddPoints}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 transform hover:scale-105 active:scale-95 shadow-md"
          >
            Aplicar Puntos
          </button>
          <button
            onClick={handleUndoLastScore}
            disabled={player.scoreHistory?.length === 0}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition duration-200 transform hover:scale-105 active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            title="Deshacer última puntuación"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 14m0 0v5h5m-5 5l-1 1m1-1l1-1m-1 1h6m-3-3v6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;