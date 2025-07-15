import { useEffect, useRef } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div ref={modalRef} className="bg-zinc-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-zinc-700 animate-zoom-in relative">
        <h2 className="text-3xl font-extrabold text-lime-400 mb-6 text-center drop-shadow-md">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-400 text-4xl transition-colors duration-200 opacity-75 hover:opacity-100 font-bold p-1"
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}