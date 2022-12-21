export type Validation = PlayerIsInGameQueue;

export type PlayerIsInGameQueue = {
  kind: "PlayerIsInGameQueue";
  playerId: string;
};
