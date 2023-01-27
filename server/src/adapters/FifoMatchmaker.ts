import { MatchmakingAlgorithm } from "../app/ports/MatchmakingAlgorithm";

export function createFifoMatchmaker(): MatchmakingAlgorithm {
  return (state) => {
    const allPlayerIds = Object.keys(state.playersById);

    if (allPlayerIds.length > 1) {
      return {
        player1Id: allPlayerIds[0],
        player2Id: allPlayerIds[1],
      };
    }
  };
}
