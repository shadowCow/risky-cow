import {
  requestResponseTest,
  RequestResponseTestCase,
} from '../../event/request_response.testutil'
import {
  gameById,
  gameByIdSuccess,
  gameCompleted,
  GameHistory,
  gameNotFound,
  gameRecorded,
  GamesHistory,
  GamesHistoryRequest,
  GamesHistoryResponse,
  listGames,
  listGamesSuccess,
} from '../games_history'
import { createGamesHistoryInMemory } from './games_history_inmemory'

const game1Id = 'g1'
const game2Id = 'g2'

describe('games history', () => {
  const gamesHistoryTest = (
    testCase: RequestResponseTestCase<
      GamesHistoryRequest<TestMove>,
      GamesHistoryResponse<TestMove>
    >,
  ) => requestResponseTest(testCase)

  describe('gameCompleted', () => {
    test(
      'game is recorded',
      gamesHistoryTest({
        Given: newService,
        When: gameCompleted<TestMove>({ game: testGame1() }),
        Then: gameRecorded({ id: game1Id }),
      }),
    )
  })

  describe('gameById', () => {
    test(
      'game does not exist',
      gamesHistoryTest({
        Given: newService,
        When: gameById({ id: game1Id }),
        Then: gameNotFound({ id: game1Id }),
      }),
    )

    test(
      'game exists',
      gamesHistoryTest({
        Given: serviceWithGames,
        When: gameById({ id: game1Id }),
        Then: gameByIdSuccess<TestMove>({ game: testGame1() }),
      }),
    )
  })

  describe('listGames', () => {
    test(
      'no games found',
      gamesHistoryTest({
        Given: newService,
        When: listGames(),
        Then: listGamesSuccess({ games: [] }),
      }),
    )

    test(
      'some games found',
      gamesHistoryTest({
        Given: serviceWithGames,
        When: listGames(),
        Then: listGamesSuccess({ games: [testGame1(), testGame2()] }),
      }),
    )
  })
})

type TestMove = { from: number; to: number }

function newService(): Promise<GamesHistory<TestMove>> {
  return Promise.resolve(createGamesHistoryInMemory<TestMove>())
}

function serviceWithGames(): Promise<GamesHistory<TestMove>> {
  return Promise.resolve(
    createGamesHistoryInMemory<TestMove>([testGame1(), testGame2()]),
  )
}

function testGame1(): GameHistory<TestMove> {
  return {
    gameId: game1Id,
    player1Id: 'p1',
    player2Id: 'p2',
    moves: [
      { from: 1, to: 2 },
      { from: 9, to: 8 },
    ],
  }
}

function testGame2(): GameHistory<TestMove> {
  return {
    gameId: game2Id,
    player1Id: 'p1',
    player2Id: 'p3',
    moves: [
      { from: 11, to: 12 },
      { from: 19, to: 88 },
    ],
  }
}
