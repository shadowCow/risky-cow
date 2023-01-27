import { State as PlayerQueueState } from "./PlayerQueue";

export type MatchmakingAlgorithm = (
  state: PlayerQueueState
) => MatchPairing | undefined;

export type MatchPairing = {
  player1Id: string;
  player2Id: string;
};
