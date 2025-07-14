import React from 'react';
import { useGame } from '../context/GameContext';

const GameControls: React.FC = () => {
  const { resetGame, players, setPlayers } = useGame();

  const handleResetGame = () => {
    if (confirm('¿Estás seguro de que quieres reiniciar las puntuaciones de todos los jugadores? Esta acción no se puede deshacer.')) {
      resetGame();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 p-4 bg-gray-800 rounded-lg shadow-xl mt-6 border border-gray-700">
      <button
        onClick={handleResetGame}
        disabled={players.length === 0}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition duration-200 transform hover:scale-105 active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Reiniciar Puntuaciones
      </button>
      <button
        onClick={() => {
          if (confirm('¿Estás seguro de que quieres empezar un juego completamente nuevo? Esto eliminará a todos los jugadores y sus puntuaciones.')) {
            setPlayers([]);
          }
        }}
        disabled={players.length === 0}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition duration-200 transform hover:scale-105 active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Nuevo Juego (Borrar Jugadores)
      </button>
    </div>
  );
};

export default GameControls;