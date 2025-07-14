import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const PlayerInput: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const { addPlayer } = useGame();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      addPlayer(playerName.trim());
      setPlayerName('');
    } else {
        alert('Por favor, ingresa un nombre para el jugador.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-800 rounded-lg shadow-xl mb-6 border border-gray-700">
      <input
        type="text"
        placeholder="Nombre del jugador"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="flex-grow p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-lg"
        autoComplete="off"
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition duration-200 transform hover:scale-105 active:scale-95 shadow-md"
      >
        Añadir Jugador
      </button>
    </form>
  );
};

export default PlayerInput;