import Modal from './Modal';
import type { SavedGame } from '../types'; 

type Props = {
  isOpen: boolean;
  onClose: () => void;
  savedGames: SavedGame[]; 
  onLoadGame: (game: SavedGame) => void;
  onDeleteGame: (id: string) => void;
};

export default function HistoryModal({ isOpen, onClose, savedGames, onLoadGame, onDeleteGame }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Game History">
      {savedGames.length === 0 ? (
        <p className="text-zinc-400 text-center text-lg py-8">There are no saved games yet.</p>
      ) : (
        <ul className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar pr-2">
          {savedGames.map((game) => (
            <li key={game.id} className="flex flex-col sm:flex-row justify-between items-center bg-zinc-700/50 p-4 rounded-xl border border-zinc-600 shadow-sm animate-fade-in-up">
              <div className="flex-grow text-zinc-100 mb-2 sm:mb-0 mr-4">
                <p className="font-semibold text-lg">{game.players.map(p => p.name).join(' vs ')}</p>
                <p className="text-sm text-zinc-400">{new Date(game.timestamp).toLocaleString()}</p>
                <p className="text-sm text-zinc-400">Limit: {game.limit} points</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { onLoadGame(game); onClose(); }} 
                  className="bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors transform active:scale-95"
                >
                  Load
                </button>
                <button
                  onClick={() => onDeleteGame(game.id)}
                  className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-500 transition-colors transform active:scale-95"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 flex justify-center">
        <button
          onClick={onClose}
          className="bg-zinc-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-zinc-500 transition-all duration-300 shadow-md transform active:scale-95 text-lg"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}