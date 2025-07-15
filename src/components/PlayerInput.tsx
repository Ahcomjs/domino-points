import { useState } from 'react';

type Props = {
  onAdd: (name: string) => void;
};

export default function PlayerInput({ onAdd }: Props) {
  const [playerName, setPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (playerName.trim()) {
      onAdd(playerName.trim());
      setPlayerName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl">
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Player name"
        className="flex-grow bg-zinc-700 text-white px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-300 placeholder-zinc-400 border border-zinc-600 shadow-inner w-full sm:w-auto"
        aria-label="New player name"
      />
      <button
        onClick={handleAddPlayer}
        className="bg-lime-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-lime-500 transition-all duration-300 shadow-md transform active:scale-95 w-full sm:w-auto sm:max-w-xs" // Ancho limitado para el botón
      >
        Add player
      </button>
    </div>
  );
}