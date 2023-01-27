import { MatchmakingAlgorithm } from "./MatchmakingAlgorithm";
import { State as PlayerQueueState } from "./PlayerQueue";
import { PlayerRepo } from "./PlayerRepo";

export type MatchmakingService = {
  onCommand: (command: Command) => void;
};

export type Command = JoinQueueRequest | LeaveQueueRequest;

export type JoinQueueRequest = {
  kind: "JoinQueueRequest";
  playerId: string;
};
export type LeaveQueueRequest = {
  kind: "LeaveQueueRequest";
  playerId: string;
};

export function createMatchmakingService(
  playerRepo: PlayerRepo,
  playerQueue: PlayerQueueState,
  matchmaker: MatchmakingAlgorithm
): MatchmakingService {
  return {
    onCommand(command) {
      switch (command.kind) {
        case "JoinQueueRequest":
          break;
        case "LeaveQueueRequest":
          break;
        default:
          const _exhaust: never = command;
          return _exhaust;
      }
    },
  };
}
