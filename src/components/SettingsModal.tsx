import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  limit: number;
  setLimit: (limit: number) => void;
  onSaveSuccess: () => void; 
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, limit, setLimit, onSaveSuccess }) => { 

const [inputLimit, setInputLimit] = useState<string>(limit.toString());

  useEffect(() => {
    setInputLimit(limit.toString());
  }, [limit, isOpen]);

  if (!isOpen) return null;

  const handleSaveAndClose = () => {
    const newLimitValue = parseInt(inputLimit);
    if (!isNaN(newLimitValue) && newLimitValue > 0) {
      setLimit(newLimitValue);
      onSaveSuccess(); 
    } 
    onClose(); 
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-800 text-white rounded-lg shadow-xl p-6 w-full max-w-md border border-zinc-700 animate-scale-in">
        <h3 className="text-2xl font-bold text-orange-400 mb-6 text-center">Game Settings</h3>

        <div className="mb-6">
          <label htmlFor="limit" className="block text-zinc-300 text-lg mb-2">
            Winning Score Limit:
          </label>
          <input
            type="number"
            id="limit"
            value={inputLimit}
            onChange={(e) => setInputLimit(e.target.value)}
            placeholder="Ej: 100"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
            min="1"
            aria-label="Score Limit"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transform active:scale-95"
          >
            Close
          </button>
          <button
            onClick={handleSaveAndClose}
            className="bg-lime-600 hover:bg-lime-500 text-white font-bold px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-75 transform active:scale-95"
          >
            Save and Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SettingsModal;