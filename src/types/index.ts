export type Player = {
  name: string;
  scores: number[];
  wins: number;
  losses: number;
};

export type SavedGame = {
  id: string;
  timestamp: number; 
  players: Player[];
  limit: number;
};