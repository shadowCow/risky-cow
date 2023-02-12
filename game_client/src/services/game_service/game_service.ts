import { GameServiceApi } from './api/game_service_api'

export type GameServiceState = PlayerIdle | PlayerInQueue | PlayerInGame

export function initGameServiceState(playerId: string): GameServiceState {
  return {
    kind: 'PlayerIdle',
    playerId,
  }
}

export type PlayerIdle = {
  kind: 'PlayerIdle'
  playerId: string
}
export function playerIdle(playerId: string): PlayerIdle {
  return {
    kind: 'PlayerIdle',
    playerId,
  }
}
export type PlayerInQueue = {
  kind: 'PlayerInQueue'
  playerId: string
}
export function playerInQueue(playerId: string): PlayerInQueue {
  return {
    kind: 'PlayerInQueue',
    playerId,
  }
}
export type PlayerInGame = {
  kind: 'PlayerInGame'
  playerId: string
  gameId: string
}
export function playerInGame(playerId: string, gameId: string): PlayerInGame {
  return {
    kind: 'PlayerInGame',
    playerId,
    gameId,
  }
}

export type GameServiceCommand = JoinRandomGame
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

export type GameService = {
  dispatch: (command: GameServiceCommand) => void

  subscribe: (cb: Subscriber<GameServiceState>) => Unsubscribe
}

export type Subscriber<S> = (state: S) => void
export type Unsubscribe = () => void

export function createGameService(
  api: GameServiceApi,
  playerId: string,
): GameService {
  let _subscriber: Subscriber<GameServiceState> = () => {}
  let _state: GameServiceState = initGameServiceState(playerId)

  const setState = (state: GameServiceState) => {
    _state = state
    _subscriber(state)
  }

  return {
    dispatch(command) {
      switch (_state.kind) {
        case 'PlayerIdle':
          switch (command.kind) {
            case 'JoinRandomGame':
              api
                .joinRandomGame(command.playerId)
                .then((r) => {
                  switch (r.kind) {
                    case 'JoinedQueue':
                      setState(playerInQueue(command.playerId))
                      break
                    case 'JoinQueueFailure':
                      console.error(r.reason)
                      break
                    default:
                      const _ec: never = r
                  }
                })
                .catch((err) => {
                  console.error(err)
                })
            default:
          }
          break
        case 'PlayerInQueue':
          break
        case 'PlayerInGame':
          break
        default:
          const _ec: never = _state
      }
    },
    subscribe(cb) {
      _subscriber = cb
      _subscriber(_state)

      return () => (_subscriber = () => {})
    },
  }
}
