import { Player } from "./Player";

export type PlayerRepo = {
  getPlayerById: (id: string) => Player | undefined;
};
