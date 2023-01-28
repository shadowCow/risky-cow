import { GameService } from '../domain/ports/GameService'
import { IdGenerator } from '../domain/ports/IdGenerator'

type State = {
  gamesById: {
    [id: string]: {
      player1Id: string
      player2Id: string
    }
  }
  playerIdToGameId: {
    [id: string]: string
  }
}

export function createGameServiceInMemory(
  idGenerator: IdGenerator,
): GameService {
  const state: State = {
    gamesById: {},
    playerIdToGameId: {},
  }

  return {
    onMatchMade(event) {
      const gameId = idGenerator.uuid()
      state.gamesById[gameId] = {
        player1Id: event.player1Id,
        player2Id: event.player2Id,
      }

      state.playerIdToGameId[event.player1Id] = gameId
      state.playerIdToGameId[event.player2Id] = gameId
    },
    getGameIdByPlayerId(playerId) {
      return Promise.resolve(state.playerIdToGameId[playerId])
    },
  }
}
