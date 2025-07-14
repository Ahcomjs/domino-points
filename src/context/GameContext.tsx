import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Player } from '../types';

interface GameContextType {
  players: Player[];
  addPlayer: (name: string) => void;
  updatePlayerScore: (id: string, points: number) => void;
  undoLastScore: (id: string) => void; 
  resetGame: () => void;
  removePlayer: (id: string) => void;
  setPlayers: (players: Player[]) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [players, setPlayersState] = useState<Player[]>(() => {
    try {
      const savedPlayers = localStorage.getItem('dominoPlayers');
      return savedPlayers ? JSON.parse(savedPlayers) : [];
    } catch (error) {
      console.error("Error parsing saved players from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dominoPlayers', JSON.stringify(players));
    } catch (error) {
      console.error("Error saving players to localStorage:", error);
    }
  }, [players]);

  const addPlayer = (name: string) => {
    if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
        alert('Este nombre de jugador ya existe. Por favor, usa otro.');
        return;
    }
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
      score: 0,
      scoreHistory: [], // Initialize score history
    };
    setPlayersState((prevPlayers) => [...prevPlayers, newPlayer]);
  };

  const updatePlayerScore = (id: string, points: number) => {
    setPlayersState((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player.id === id) {
          return {
            ...player,
            score: player.score + points,
            scoreHistory: [...player.scoreHistory, points], // Add points to history
          };
        }
        return player;
      })
    );
  };

  const undoLastScore = (id: string) => {
    setPlayersState((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player.id === id && player.scoreHistory.length > 0) {
          const lastScore = player.scoreHistory[player.scoreHistory.length - 1];
          const newScoreHistory = player.scoreHistory.slice(0, -1); // Remove last entry
          return {
            ...player,
            score: player.score - lastScore, // Subtract the last score
            scoreHistory: newScoreHistory,
          };
        }
        return player;
      })
    );
  };

  const removePlayer = (id: string) => {
    setPlayersState((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
  };

  const resetGame = () => {
    setPlayersState((prevPlayers) => prevPlayers.map((player) => ({ ...player, score: 0, scoreHistory: [] })));
  };

  const setPlayers = (newPlayers: Player[]) => {
    setPlayersState(newPlayers);
  };

  return (
    <GameContext.Provider
      value={{ players, addPlayer, updatePlayerScore, resetGame, removePlayer, setPlayers, undoLastScore }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};