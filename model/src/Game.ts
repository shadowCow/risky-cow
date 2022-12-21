import { Player } from "./Player";

export type GameState = {
  id: string;
  player1: Player;
  player2: Player;
  player1State: PlayerOneState;
  player2State: PlayerTwoState;
};

export function createGameState(
  id: string,
  player1: Player,
  player2: Player
): GameState {
  return {
    id,
    player1,
    player2,
    player1State: {},
    player2State: {},
  };
}

export type PlayerOneState = {};

export type PlayerTwoState = {};

export type GameMove = {};
