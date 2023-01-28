export type Validations = PlayerIsInQueue | PlayerIsNotInQueue | MatchMade

export type PlayerIsInQueue = {
  kind: 'PlayerIsInQueue'
  playerId: string
}

export type PlayerIsNotInQueue = {
  kind: 'PlayerIsNotInQueue'
  playerId: string
}

export type MatchMade = {
  kind: 'MatchMade'
  player1Id: string
  player2Id: string
}
