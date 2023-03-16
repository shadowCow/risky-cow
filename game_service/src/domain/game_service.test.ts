import { CommandExecutor, serviceTest } from '../../test/util/service_test'
import {
  concedeGameRequest,
  createGameService,
  GameService,
  joinGameRequest,
  joinGameResponse,
  leaveQueueRequest,
  makeMoveRequest,
  playerInQueue,
  playerStatusRequest,
  Request,
  Response,
} from './game_service'
import { assertNever } from '../fp/pattern_matching'

describe('game_service', () => {
  const player1Id = 'p1'
  const player2Id = 'p2'

  describe('join game request', () => {
    test('no players queued', async () => {
      await gameServiceTest({
        Given: createCommandExecutor,
        When: joinGameRequest({ playerId: player1Id }),
        Then: joinGameResponse({
          result: playerInQueue({ playerId: player1Id }),
        }),
      })
    })

    test('players queued', () => {})

    test('player is already queued', () => {})

    test('player is already in game', () => {})

    test('service at max capacity', () => {})
  })

  describe('player status request', () => {
    test('player is queued', () => {})

    test('player is in a game', () => {})

    test('player is not queued or in a game', () => {})
  })

  describe('leave queue request', () => {
    test('player is queued', () => {})

    test('player is not queued', () => {})
  })

  describe('make move request', () => {
    test('player is in game, valid move', () => {})

    test('player is in game, move invalid', () => {})

    test('player is not in game', () => {})
  })

  describe('concede game', () => {
    test('player is in game', () => {})

    test('player is not in game', () => {})
  })
})

const gameServiceTest = serviceTest<Request, Response>

function createCommandExecutor(): CommandExecutor<Request, Response> {
  const service = createGameService()

  return (request) => {
    switch (request.kind) {
      case joinGameRequest.kind:
        return service.joinGame(request)
      case playerStatusRequest.kind:
        return service.playerStatus(request)
      case leaveQueueRequest.kind:
        return service.leaveQueue(request)
      case makeMoveRequest.kind:
        return service.makeMove(request)
      case concedeGameRequest.kind:
        return service.concedeGame(request)
      default:
        assertNever(request)
    }
  }
}
