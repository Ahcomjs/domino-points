import React from 'react';

interface WinnerModalProps {
  isOpen: boolean;
  winnerName: string | null;
  loserName: string | null;
  onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({
  isOpen,
  winnerName,
  loserName,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all sm:max-w-lg sm:w-full">
        <div className="p-6">
          <h2 className="text-3xl font-extrabold text-white mb-6 text-center">Game Over!</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {winnerName && (
              <div className="flex-1 bg-gradient-to-br from-lime-600 to-lime-800 p-5 rounded-md text-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                <p className="text-xl font-bold text-white mb-2">Congratulations!</p>
                <p className="text-4xl font-extrabold text-white drop-shadow-md">{winnerName}</p>
                <p className="text-xl font-bold text-white mt-2">YOU WON!</p>
              </div>
            )}
            
            {loserName && (
              <div className="flex-1 bg-gradient-to-br from-red-600 to-red-800 p-5 rounded-md text-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                <p className="text-xl font-bold text-white mb-2">Uh oh, bad luck!</p>
                <p className="text-4xl font-extrabold text-white drop-shadow-md">{loserName}</p>
                <p className="text-xl font-bold text-white mt-2">YOU LOST</p>
              </div>
            )}
          </div>
        </div>
        <div className="px-6 py-4 bg-slate-700 flex justify-center">
          <button
            onClick={handleClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-200 text-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;