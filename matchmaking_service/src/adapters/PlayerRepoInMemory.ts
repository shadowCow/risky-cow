import { PlayerRepo } from "../app/ports/PlayerRepo";

export function createPlayerRepoInMemory(): PlayerRepo {
  return {
    getPlayerById(id) {
      return {
        id,
        displayName: "bill",
        rating: 2,
      };
    },
  };
}
