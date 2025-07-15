import ReactConfetti from 'react-confetti';
import { useWindowSize } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import winSound from './../assets/sounds/win.mp3';

type Props = {
  onComplete: () => void;
};

export default function Confetti({ onComplete }: Props) {
  const { width, height } = useWindowSize();
  const [soundPlayed, setSoundPlayed] = useState(false); 

  useEffect(() => {
    if (width !== null && height !== null && !soundPlayed) { 
      const audio = new Audio(winSound); 
      audio.play().then(() => {
        setSoundPlayed(true);
      }).catch(error => {
        console.error("Error playing sound:", error);
        setSoundPlayed(true); 
      });
    }
  }, [width, height, soundPlayed]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <ReactConfetti
        width={width || 0}
        height={height || 0}
        recycle={false}
        numberOfPieces={500}
        gravity={0.15}
        tweenDuration={10000}
        onConfettiComplete={onComplete}
      />
    </div>
  );
}