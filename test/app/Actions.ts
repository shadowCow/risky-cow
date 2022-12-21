export type Action = JoinRandomGame;

export type JoinRandomGame = {
  kind: "JoinRandomGame";
  playerId: string;
};
