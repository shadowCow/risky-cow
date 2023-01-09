import { Fst } from "./Fst";
import { createGameState, GameMove, GameState } from "./Game";
import { Player } from "./Player";
import { PlayerRepo } from "./PlayerRepo";

export type GameRoomInput = QueueForGame | LeaveQueue | MakeMove;

export type QueueForGame = {
  kind: "QueueForGame";
  playerId: string;
};

export type LeaveQueue = {
  kind: "LeaveQueue";
  playerId: string;
};

export type MakeMove = {
  kind: "MakeMove";
  move: GameMove;
};

export type GameRoomOutput = JoinedQueue | LeftQueue | GameStarted | MadeMove;

export type JoinedQueue = {
  kind: "JoinedQueue";
  playerId: string;
};
function createJoinedQueue(playerId: string): JoinedQueue {
  return {
    kind: "JoinedQueue",
    playerId,
  };
}

export type LeftQueue = {
  kind: "LeftQueue";
  playerId: string;
};
function createLeftQueue(playerId: string): LeftQueue {
  return {
    kind: "LeftQueue",
    playerId,
  };
}

export type GameStarted = {
  kind: "GameStarted";
  player1Id: string;
  player2Id: string;
};
function createGameStarted(player1Id: string, player2Id: string): GameStarted {
  return {
    kind: "GameStarted",
    player1Id,
    player2Id,
  };
}

export type MadeMove = {
  kind: "MadeMove";
  move: GameMove;
};

type GameRoomState = {
  playerIdQueue: Array<string>;
  games: Games;
};

function createGameRoomState(): GameRoomState {
  return {
    playerIdQueue: [],
    games: {},
  };
}

export type Games = {
  [id: string]: GameState;
};

function enqueuePlayer(
  state: GameRoomState,
  playerId: string
): Array<GameRoomOutput> {
  state.playerIdQueue.push(playerId);

  return [createJoinedQueue(playerId)];
}

function removePlayerFromQueue(
  state: GameRoomState,
  playerId: string
): Array<GameRoomOutput> {
  const indexOfPlayer = state.playerIdQueue.indexOf(playerId);

  if (indexOfPlayer > -1) {
    state.playerIdQueue.splice(indexOfPlayer, 1);

    return [];
  }

  return [];
}

function startGame(
  state: GameRoomState,
  idGenerator: () => string,
  playerRepo: PlayerRepo
): Array<GameRoomOutput> {
  const player2Id = state.playerIdQueue.pop();
  const player1Id = state.playerIdQueue.pop();

  if (player1Id && player2Id) {
    const gameId = idGenerator();
    const player1 = playerRepo.getPlayerById(player1Id);
    const player2 = playerRepo.getPlayerById(player2Id);

    if (player1 && player2) {
      const game = createGameState(gameId, player1, player2);

      state.games[gameId] = game;

      return [createGameStarted(player1Id, player2Id)];
    }
  }

  return [];
}

export type GameRoomFst = Fst<GameRoomInput, GameRoomOutput>;

export function createGameRoomFst(
  idGenerator: () => string,
  playerRepo: PlayerRepo
): GameRoomFst {
  const state: GameRoomState = createGameRoomState();

  return {
    onInput(i) {
      switch (i.kind) {
        case "QueueForGame":
          if (state.playerIdQueue.length < 1) {
            return enqueuePlayer(state, i.playerId);
          } else {
            return [];
          }
        case "LeaveQueue":
          return [];
        case "MakeMove":
          return [];
        default:
          const _exhaust: never = i;
      }
    },
  };
}
