import { Player } from './Player'

export type State = {
  playersById: {
    [id: string]: Player
  }
}
export function createPlayerQueueState(): State {
  return {
    playersById: {},
  }
}

export type Event = PlayerJoinedQueue | PlayerLeftQueue | MatchMade

export type PlayerJoinedQueue = {
  kind: 'PlayerJoinedQueue'
  player: Player
}
export function playerJoinedQueue(player: Player): PlayerJoinedQueue {
  return {
    kind: 'PlayerJoinedQueue',
    player,
  }
}
export type PlayerLeftQueue = {
  kind: 'PlayerLeftQueue'
  playerId: string
}
export function playerLeftQueue(playerId: string): PlayerLeftQueue {
  return {
    kind: 'PlayerLeftQueue',
    playerId,
  }
}
export type MatchMade = {
  kind: 'MatchMade'
  matchId: string
  player1Id: string
  player2Id: string
}
export function matchMade(
  matchId: string,
  player1Id: string,
  player2Id: string,
): MatchMade {
  return {
    kind: 'MatchMade',
    matchId,
    player1Id,
    player2Id,
  }
}

export function apply(state: State, event: Event): State {
  switch (event.kind) {
    case 'PlayerJoinedQueue':
      return {
        ...state,
        playersById: {
          ...state.playersById,
          [event.player.id]: event.player,
        },
      }
    case 'PlayerLeftQueue':
      return removePlayersById(state, [event.playerId])
    case 'MatchMade':
      return removePlayersById(state, [event.player1Id, event.player2Id])
    default:
      const _exhaust: never = event
      return _exhaust
  }
}

function removePlayersById(state: State, ids: Array<string>): State {
  const updatedPlayers = { ...state.playersById }
  ids.forEach((id) => delete updatedPlayers[id])

  return {
    ...state,
    playersById: updatedPlayers,
  }
}

export function getQueueLength(state: State): number {
  return Object.keys(state.playersById).length
}
