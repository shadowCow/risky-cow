export type GameServiceApi = {
  pollStatus: (playerId: string) => Promise<PollStatusResponse>
  joinRandomGame: (playerId: string) => Promise<JoinRandomGameResponse>
}

export type PollStatusResponse =
  | PollStatusPlayerIdle
  | PollStatusPlayerInQueue
  | PollStatusPlayerInGame
export type PollStatusPlayerIdle = {
  kind: 'PollStatusPlayerIdle'
}
export function pollStatusPlayerIdle(): PollStatusPlayerIdle {
  return {
    kind: 'PollStatusPlayerIdle',
  }
}
export type PollStatusPlayerInQueue = {
  kind: 'PollStatusPlayerInQueue'
}
export function pollStatusPlayerInQueue(): PollStatusPlayerInQueue {
  return {
    kind: 'PollStatusPlayerInQueue',
  }
}
export type PollStatusPlayerInGame = {
  kind: 'PollStatusPlayerInGame'
  gameId: string
}
export function pollStatusPlayerInGame(gameId: string): PollStatusPlayerInGame {
  return {
    kind: 'PollStatusPlayerInGame',
    gameId,
  }
}

export type JoinRandomGameResponse = JoinedQueue | JoinQueueFailure
export type JoinedQueue = {
  kind: 'JoinedQueue'
}
export function joinedQueue(): JoinedQueue {
  return {
    kind: 'JoinedQueue',
  }
}
export type JoinQueueFailure = {
  kind: 'JoinQueueFailure'
  reason: string
}
export function joinQueueFailure(reason: string): JoinQueueFailure {
  return {
    kind: 'JoinQueueFailure',
    reason,
  }
}
