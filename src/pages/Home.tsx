import { useState, useEffect, useCallback, useRef } from 'react';
import PlayerInput from '../components/PlayerInput';
import PlayerCard from '../components/PlayerCard';
import Confetti from '../components/Confetti';
import SettingsModal from '../components/SettingsModal';
import HistoryModal from '../components/HistoryModal';
import AlertDialog from '../components/AlertDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import WinnerModal from '../components/WinnerModal';
import type { Player, SavedGame } from '../types';
import dominoImage from '../assets/img/domino.png';

const WIN_SOUND_PATH = '/sounds/win.mp3';

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [limit, setLimit] = useState<number>(100);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [savedGames, setSavedGames] = useState<SavedGame[]>([]);
  const [isLoadedFromLocalStorage, setIsLoadedFromLocalStorage] = useState(false);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  
  const currentActionRef = useRef<(() => void) | null>(null); 

  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winnerNameForModal, setWinnerNameForModal] = useState<string | null>(null);
  const [loserNameForModal, setLoserNameForModal] = useState<string | null>(null);

  const playWinSound = useCallback(() => {
    try {
      const audio = new Audio(WIN_SOUND_PATH);
      audio.play().catch(e => {
        if (e.name === 'NotAllowedError') {
          console.warn("Audio playback blocked by browser autoplay policy. User interaction required.");
        } else {
          console.error("Error playing sound:", e);
        }
      });
    } catch (e) {
      console.error("Failed to create Audio object or path error:", e);
    }
  }, []);

  useEffect(() => {
    try {
      const savedPlayers = localStorage.getItem('dominoCurrentPlayers');
      const savedLimit = localStorage.getItem('dominoCurrentLimit');
      const loadedSavedGames = localStorage.getItem('dominoSavedGames');

      if (savedPlayers) {
        try {
          const parsedPlayers = JSON.parse(savedPlayers);
          if (Array.isArray(parsedPlayers) && parsedPlayers.every(p => 'name' in p && 'scores' in p)) {
            setPlayers(parsedPlayers);
          } else {
            console.warn("Invalid players data in localStorage, resetting.");
            setPlayers([]);
          }
        } catch (e) {
          console.error("Error parsing saved players:", e);
          setPlayers([]);
        }
      } else {
        setPlayers([]);
      }

      if (savedLimit) {
        const parsedLimit = parseInt(savedLimit);
        setLimit(isNaN(parsedLimit) ? 100 : parsedLimit);
      } else {
        setLimit(100);
      }

      if (loadedSavedGames) {
        try {
          const parsedSavedGames = JSON.parse(loadedSavedGames);
          if (Array.isArray(parsedSavedGames) && parsedSavedGames.every(g => 'id' in g && 'players' in g)) {
            setSavedGames(parsedSavedGames);
          } else {
            console.warn("Invalid saved games data in localStorage, resetting.");
            setSavedGames([]);
          }
        } catch (e) {
          console.error("Error parsing saved games history:", e);
          setSavedGames([]);
        }
      } else {
        setSavedGames([]);
      }
    } catch (error) {
      console.error("Critical error loading from localStorage:", error);
    } finally {
      setIsLoadedFromLocalStorage(true);
    }
  }, []);

  useEffect(() => {
    if (isLoadedFromLocalStorage) {
      try {
        localStorage.setItem('dominoCurrentPlayers', JSON.stringify(players));
        localStorage.setItem('dominoCurrentLimit', limit.toString());
      } catch (error) {
        console.error("Error saving players/limit to localStorage:", error);
      }
    }
  }, [players, limit, isLoadedFromLocalStorage]);

  useEffect(() => {
    if (isLoadedFromLocalStorage) {
      try {
        localStorage.setItem('dominoSavedGames', JSON.stringify(savedGames));
      } catch (error) {
        console.error("Error saving savedGames to localStorage:", error);
      }
    }
  }, [savedGames, isLoadedFromLocalStorage]);

  useEffect(() => {
    if (isLoadedFromLocalStorage && savedGames.length > 0) {
      const now = Date.now();
      const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000); 

      setSavedGames(prevGames => {
        const filteredGames = prevGames.filter(game => game.timestamp > oneMonthAgo);
        if (filteredGames.length !== prevGames.length) {
          console.log(`${prevGames.length - filteredGames.length} old games were deleted.`);
          localStorage.setItem('dominoSavedGames', JSON.stringify(filteredGames));
          return filteredGames;
        }
        return prevGames;
      });
    }
  }, [isLoadedFromLocalStorage, savedGames]); 

  const getWinner = useCallback(() => {
    for (let i = 0; i < players.length; i++) {
      const total = players[i].scores.reduce((a, b) => a + b, 0);
      if (total >= limit) {
        return i;
      }
    }
    return null;
  }, [players, limit]);

  useEffect(() => {
    const currentWinner = getWinner();
    setWinnerIndex(currentWinner);

    if (currentWinner !== null && !showConfetti && !showWinnerModal) {
      setShowConfetti(true);
      
      const winner = players[currentWinner];
      setWinnerNameForModal(winner.name);

      let loser = null;
      if (players.length === 2) {
        const otherPlayerIndex = (currentWinner + 1) % 2;
        loser = players[otherPlayerIndex];
        setLoserNameForModal(loser.name);
      } else {
        setLoserNameForModal(null);
      }
      setShowWinnerModal(true);
    } else if (currentWinner === null && (showConfetti || showWinnerModal)) {
      setShowConfetti(false);
      setShowWinnerModal(false);
      setWinnerNameForModal(null);
      setLoserNameForModal(null);
    }
  }, [players, limit, getWinner, showConfetti, showWinnerModal]);

  const addPlayer = (name: string) => {
    if (players.length >= 2) return;
    setPlayers([...players, { name, scores: [], wins: 0, losses: 0 }]);
  };

  const removePlayer = (playerIndexToRemove: number) => {
    const updatedPlayers = players.filter((_, i) => i !== playerIndexToRemove);
    setPlayers(updatedPlayers);
    if (playerIndexToRemove === winnerIndex) {
      setShowConfetti(false);
      setWinnerIndex(null);
      setShowWinnerModal(false);
    }
  };

  const addPoint = (playerIndex: number, value: number) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].scores.push(value);

    const currentPlayerTotal = updatedPlayers[playerIndex].scores.reduce((a, b) => a + b, 0);

    if (currentPlayerTotal >= limit && winnerIndex === null) {
        updatedPlayers[playerIndex].wins += 1;
        if (updatedPlayers.length === 2) {
            updatedPlayers[(playerIndex + 1) % 2].losses += 1;
        }
        setWinnerIndex(playerIndex);
    }
    setPlayers(updatedPlayers);
  };

  const removeScore = (playerIndex: number, scoreIdx: number) => {
    const updatedPlayers = [...players];
    const removedScore = updatedPlayers[playerIndex].scores.splice(scoreIdx, 1)[0];
    
    const previousTotal = updatedPlayers[playerIndex].scores.reduce((a, b) => a + b, removedScore);
    const newTotal = updatedPlayers[playerIndex].scores.reduce((a, b) => a + b, 0);

    if (previousTotal >= limit && newTotal < limit) {
        updatedPlayers[playerIndex].wins = Math.max(0, updatedPlayers[playerIndex].wins - 1);
        if (updatedPlayers.length === 2) {
            updatedPlayers[(playerIndex + 1) % 2].losses = Math.max(0, updatedPlayers[(playerIndex + 1) % 2].losses - 1);
        }
        if (playerIndex === winnerIndex) {
            setWinnerIndex(null);
            setShowConfetti(false);
            setShowWinnerModal(false);
        }
    }
    setPlayers(updatedPlayers);
  };

  const handleConfettiComplete = useCallback(() => {
    setShowConfetti(false);
  }, []);

  const resetAllGameStates = useCallback(() => {
    setPlayers([]);
    setLimit(100);
    setShowConfetti(false);
    setWinnerIndex(null);
    setShowWinnerModal(false);
    setWinnerNameForModal(null);
    setLoserNameForModal(null);
  }, []);

  const handleWinnerModalClose = useCallback(() => {
    setShowWinnerModal(false);
    resetAllGameStates();
  }, [playWinSound, resetAllGameStates]);

  const handleConfirm = useCallback(() => {
    if (currentActionRef.current) { 
      currentActionRef.current(); 
    }
    setShowConfirmDialog(false);
    currentActionRef.current = null; 
  }, []); 

  const handleCancelConfirm = useCallback(() => {
    setShowConfirmDialog(false);
    currentActionRef.current = null;
  }, []);

  const handleAlertClose = useCallback(() => {
    setShowAlertDialog(false);
    setAlertMessage('');
  }, []);

  const resetGamePoints = () => {
    setConfirmMessage('Are you sure you want to reset the current game\'s points? This will not affect wins/losses or saved games.');
    currentActionRef.current = () => {
      setPlayers(players.map(player => ({ ...player, scores: [] })));
      setShowConfetti(false);
      setWinnerIndex(null);
      setShowWinnerModal(false);
      setWinnerNameForModal(null);
      setLoserNameForModal(null);
    };
    setShowConfirmDialog(true); 
  };

  const startNewGame = () => {
    setConfirmMessage('Are you sure you want to start a new game? The current game will be lost if you haven\'t saved it.');
    currentActionRef.current = () => {
      resetAllGameStates();
    };
    setShowConfirmDialog(true); 
  };

  const saveCurrentGame = () => {
    if (players.length === 0) {
      setAlertMessage('There is no game in progress to save.');
      setShowAlertDialog(true);
      return;
    }
    const newSavedGame: SavedGame = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      players: players,
      limit: limit,
    };
    setSavedGames((prevGames) => {
        const exists = prevGames.some(game => game.id === newSavedGame.id);
        return exists ? prevGames : [...prevGames, newSavedGame];
    });
    setAlertMessage('Game saved successfully!');
    setShowAlertDialog(true);
  };

  const loadGame = (gameToLoad: SavedGame) => {
    setConfirmMessage('Are you sure you want to load this game? The current game will be lost if you haven\'t saved it.');
    currentActionRef.current = () => { 
      setPlayers(gameToLoad.players);
      setLimit(gameToLoad.limit);
      setShowConfetti(false);
      setWinnerIndex(getWinner());
      setShowWinnerModal(false);
      setWinnerNameForModal(null);
      setLoserNameForModal(null);
      setAlertMessage(`Saved game from ${new Date(gameToLoad.timestamp).toLocaleString()} loaded.`);
      setShowAlertDialog(true);
    };
    setShowConfirmDialog(true);
  };

  const deleteSavedGame = (idToDelete: string) => {
    setConfirmMessage('Are you sure you want to delete this saved game?');
    currentActionRef.current = () => {
      setSavedGames(prevGames => prevGames.filter(game => game.id !== idToDelete));
      setAlertMessage('Game deleted.');
      setShowAlertDialog(true);
    };
    setShowConfirmDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 md:p-10 flex flex-col items-center font-sans">
      
      <div className="flex flex-col items-center w-full flex-grow">
        <div className="flex flex-col items-center gap-2 mb-4 animate-fade-in-down">
          <img src={dominoImage} alt="Domino pieces" className="w-28 h-auto md:w-40" /> 
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-lime-400 text-center drop-shadow-lg tracking-tighter leading-tight">
            Domino Points Tracker
          </h1>
        </div>

        {players.length < 2 && (
          <div className="w-full max-w-2xl flex flex-col items-center gap-6 mt-6 animate-fade-in-down">
            <PlayerInput onAdd={addPlayer} />
          </div>
        )}

        <div className="w-full max-w-5xl flex flex-col items-center gap-6 p-6 animate-fade-in-down">
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center flex-wrap">
            <button
              onClick={resetGamePoints}
              className="bg-red-600 text-white font-bold px-4 py-2 text-base rounded-lg hover:bg-red-500 transition-all duration-300 shadow-md transform active:scale-95 w-full sm:w-auto"
            >
              Reset Points
            </button>
            <button
              onClick={startNewGame}
              className="bg-blue-600 text-white font-bold px-4 py-2 text-base rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-md transform active:scale-95 w-full sm:w-auto"
            >
              New Game
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center flex-wrap">
            <button
              onClick={saveCurrentGame}
              className="bg-teal-600 text-white font-bold px-4 py-2 text-base rounded-lg hover:bg-teal-500 transition-all duration-300 shadow-md transform active:scale-95 w-full sm:w-auto"
            >
              Save Game
            </button>
            <button
              onClick={() => setIsHistoryModalOpen(true)}
              className="bg-gray-600 text-white font-bold px-4 py-2 text-base rounded-lg hover:bg-gray-500 transition-all duration-300 shadow-md transform active:scale-95 w-full sm:w-auto"
            >
              View History
            </button>
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="bg-orange-600 text-white font-bold px-4 py-2 text-base rounded-lg hover:bg-orange-500 transition-all duration-300 shadow-md transform active:scale-95 w-full sm:w-auto"
            >
              Game Settings
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-10">
          {players.map((player, i) => {
            const playerHasWon = winnerIndex !== null && winnerIndex === i;
            const pointsInputDisabled = winnerIndex !== null && winnerIndex === i;
            return (
              <PlayerCard
                key={i}
                player={player}
                onRemoveScore={removeScore}
                onAddPoint={addPoint}
                onRemovePlayer={() => removePlayer(i)}
                hasWon={playerHasWon}
                disabled={pointsInputDisabled}
                playerIndex={i}
              />
            );
          })}
        </div>
      </div>

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        limit={limit}
        setLimit={setLimit}
        onSaveSuccess={() => { 
          setAlertMessage('Saved successfully!');
          setShowAlertDialog(true);
        }}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        savedGames={savedGames}
        onLoadGame={loadGame}
        onDeleteGame={deleteSavedGame}
      />

      {showConfetti && <Confetti onComplete={handleConfettiComplete} />}

      <WinnerModal
        isOpen={showWinnerModal}
        winnerName={winnerNameForModal}
        loserName={loserNameForModal}
        onClose={handleWinnerModalClose}
      />

      <AlertDialog
        isOpen={showAlertDialog}
        message={alertMessage}
        onClose={handleAlertClose}
      />
      <ConfirmDialog
        isOpen={showConfirmDialog}
        message={confirmMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancelConfirm}
      />

      <footer className="py-6 text-zinc-500 text-center text-sm w-full mt-auto">
        Made with ❤️ by Meregildo<br/>
        Version: 1.2.0
      </footer>
    </div>
  );
}