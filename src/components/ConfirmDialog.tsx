import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-800 text-white rounded-lg shadow-xl p-6 w-full max-w-sm border border-zinc-700 animate-scale-in">
        <h3 className="text-xl font-bold text-orange-400 mb-4">Confirmation</h3>
        <p className="text-zinc-300 mb-6 text-center">{message}</p>
        <div className="flex justify-around gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transform active:scale-95 w-full"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transform active:scale-95 w-full"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;