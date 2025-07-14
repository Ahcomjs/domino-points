import React from 'react';
import PlayerInput from './components/PlayerInput';
import ScoreBoard from './components/ScoreBoard';
import GameControls from './components/GameControls';
import { GameProvider } from './context/GameContext';

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 sm:p-10 flex flex-col items-center">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 mb-10 drop-shadow-lg text-center leading-tight">
          Domino Points Tracker
        </h1>

        <div className="w-full max-w-5xl">
          <PlayerInput />
          <ScoreBoard />
          <GameControls />
        </div>

        <footer className="mt-12 text-gray-500 text-sm text-center">
          <p>Hecho con ❤️ en la República Dominicana.</p>
          <p className="mt-1">Versión: 1.1.0</p>
        </footer>
      </div>
    </GameProvider>
  );
};

export default App;