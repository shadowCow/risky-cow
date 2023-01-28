export type Action = JoinRandomGame

export type JoinRandomGame = {
  kind: 'JoinRandomGame'
  playerId: string
}
export function joinRandomGame(playerId: string): JoinRandomGame {
  return {
    kind: 'JoinRandomGame',
    playerId,
  }
}
