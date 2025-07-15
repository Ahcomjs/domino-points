import { useState } from 'react';
import type { Player } from '../types';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';

type Props = {
  player: Player;
  onRemoveScore: (playerIndex: number, scoreIndex: number) => void;
  onAddPoint: (playerIndex: number, value: number) => void;
  onRemovePlayer: () => void;
  hasWon: boolean;
  disabled: boolean;
  playerIndex: number;
};

export default function PlayerCard({
  player,
  onRemoveScore,
  onAddPoint,
  onRemovePlayer,
  hasWon,
  disabled,
  playerIndex,
}: Props) {
  const [points, setPoints] = useState('');
  const total = player.scores.reduce((acc, val) => acc + val, 0);

  const handleAddPoints = () => {
    const val = parseInt(points);
    if (!isNaN(val) && val >= 0) {
      onAddPoint(playerIndex, val);
      setPoints('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      handleAddPoints();
    }
  };

  return (
    <div className={`
      bg-gradient-to-br from-zinc-800 to-zinc-900 p-7 rounded-2xl shadow-2xl w-full max-w-md border
      ${hasWon ? 'border-lime-500 ring-4 ring-lime-500/50 animate-pulse-border' : 'border-zinc-700'}
      relative transition-all duration-300 ease-in-out transform hover:scale-[1.01]
    `}>

      <button
        onClick={onRemovePlayer}
        className="absolute top-4 right-4 text-red-500 hover:text-red-400 text-2xl transition-colors duration-200 opacity-75 hover:opacity-100 p-2 rounded-full hover:bg-zinc-700"
        title="Delete player"
        aria-label={`Delete player ${player.name}`}
      >
        <FaTrashCan />
      </button>

      <div className="flex items-center flex-wrap gap-x-3 mb-5">
        <h2 className="text-2xl font-bold text-white break-words pr-2  min-w-0">
          {player.name}
        </h2>        
        <div className="flex gap-x-2 text-base text-zinc-300 mt-2">
          <span className="bg-lime-600/20 text-lime-300 px-3 py-1 rounded-full text-xs font-semibold shadow-inner">Wins: {player.wins}</span>
          <span className="bg-red-600/20 text-red-300 px-3 py-1 rounded-full text-xs font-semibold shadow-inner">Losses: {player.losses}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Points"
          min="0"
          disabled={disabled}
          className={`
            flex-grow bg-zinc-700 text-white px-4 py-2 rounded-xl outline-none
            ${disabled ? 'opacity-60 cursor-not-allowed' : 'focus:ring-2 focus:ring-lime-500 focus:border-transparent'}
            transition-all duration-300 placeholder-zinc-400 border border-zinc-600
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          `}
          aria-label={`Add points for ${player.name}`}
        />
        <button
          onClick={handleAddPoints}
          disabled={disabled}
          className={`
            bg-lime-600 text-white font-bold px-6 py-1 rounded-xl
            ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-lime-500 transition-all duration-300 shadow-md transform active:scale-95'}
             w-full sm:w-auto
          `}
        >
          Add
        </button>
      </div>

      <ul className="space-y-3 mb-5 max-h-48 overflow-y-auto custom-scrollbar pr-2">
        {player.scores.length === 0 && <li className="text-zinc-400 italic text-center py-4 text-lg">No points recorded.</li>}
        {player.scores.map((score, i) => (
          <li key={i} className="flex justify-between items-center bg-zinc-700/50 px-5 py-2 rounded-xl border border-zinc-600 animate-fade-in-up font-medium text-zinc-100 shadow-sm">
            <span>{score}</span>
            <button
              onClick={() => onRemoveScore(playerIndex, i)}
              className="text-red-400 hover:text-red-300 transition-colors  opacity-80 hover:opacity-100 p-1 rounded-full hover:bg-zinc-600 ml-2"
              title="Delete point"
              aria-label={`Delete point ${score}`}
            >
              <FaRegTrashAlt />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-5 border-t border-zinc-700 text-right text-green-400 font-extrabold text-2xl leading-none">
        Total: {total}
      </div>
    </div>
  );
}