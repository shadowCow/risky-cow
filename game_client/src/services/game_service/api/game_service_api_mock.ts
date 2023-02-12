import {
  GameServiceApi,
  joinedQueue,
  pollStatusPlayerIdle,
} from './game_service_api'

export function createGameServiceApiMock(): GameServiceApi {
  return {
    pollStatus(playerId) {
      return Promise.resolve(pollStatusPlayerIdle())
    },
    joinRandomGame(playerId) {
      return Promise.resolve(joinedQueue())
    },
  }
}
