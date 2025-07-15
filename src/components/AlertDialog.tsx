import React from 'react';

interface AlertDialogProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-800 text-white rounded-lg shadow-xl p-6 w-full max-w-sm border border-zinc-700 animate-scale-in">
        <h3 className="text-xl font-bold text-lime-400 mb-4">Warning</h3>
        <p className="text-zinc-300 mb-6 text-center">{message}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transform active:scale-95"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;