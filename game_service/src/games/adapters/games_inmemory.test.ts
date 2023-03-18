import {
  requestResponseTest,
  RequestResponseTestCase,
  resolveWith,
} from '../../event/request_response.testutil'
import { GameRules, tie, unfinished, winner } from '../../game/game'
import {
  concedeGame,
  currentGame,
  currentGameNotFound,
  currentGameSuccess,
  gameCompleted,
  GameHistory,
  Games,
  GamesInput,
  GamesOutput,
  gameStarted,
  makeMove,
  makeMoveSuccess,
  moveWasInvalid,
  startGame,
} from '../games'
import { createGamesInMemory } from './games_inmemory'

const game1Id = 'g1'

const player1Id = 'p1'
const player2Id = 'p2'

describe('games inmemory', () => {
  const gamesTest = (
    testCase: RequestResponseTestCase<
      GamesInput<TestMove>,
      GamesOutput<TestMove>
    >,
  ) => requestResponseTest(testCase)

  describe('start game', () => {
    test(
      'game is started',
      gamesTest({
        Given: newService,
        When: startGame({ gameId: game1Id, player1Id, player2Id }),
        Then: gameStarted({ id: game1Id, player1Id, player2Id }),
      }),
    )
  })

  describe('current game', () => {
    test(
      'player has no current game',
      gamesTest({
        Given: newService,
        When: currentGame({ playerId: player1Id }),
        Then: currentGameNotFound(),
      }),
    )

    test(
      'player has a current game',
      gamesTest({
        Given: serviceWithGames,
        When: currentGame({ playerId: player1Id }),
        Then: currentGameSuccess({ game: testGame1() }),
      }),
    )
  })

  describe('make move', () => {
    test(
      'for missing game',
      gamesTest({
        Given: newService,
        When: makeMove({ playerId: player1Id, move: { tile: 0, owner: '1' } }),
        Then: currentGameNotFound(),
      }),
    )

    test(
      'invalid move',
      gamesTest({
        Given: serviceWithGames,
        When: makeMove({ playerId: player1Id, move: { tile: 0, owner: '1' } }),
        Then: moveWasInvalid({ reason: 'oops' }),
      }),
    )

    test(
      'valid move',
      gamesTest({
        Given: newService,
        When: makeMove({ playerId: player1Id, move: { tile: 0, owner: '1' } }),
        Then: makeMoveSuccess({ move: { tile: 0, owner: '1' } }),
      }),
    )
  })

  describe('concede game', () => {
    test(
      'missing game',
      gamesTest({
        Given: newService,
        When: concedeGame({ playerId: player1Id }),
        Then: currentGameNotFound(),
      }),
    )

    test(
      'concede success',
      gamesTest({
        Given: serviceWithGames,
        When: concedeGame({ playerId: player1Id }),
        Then: gameCompleted({ game: testGame1() }),
      }),
    )
  })
})

function newService(): Promise<Games<TestMove>> {
  return resolveWith(createGamesInMemory(ticTacToeRules()))
}

function serviceWithGames(): Promise<Games<TestMove>> {
  return resolveWith(createGamesInMemory(ticTacToeRules(), [testGame1()]))
}

function testGame1(): GameHistory<TestMove> {
  return {
    gameId: game1Id,
    player1Id: 'p1',
    player2Id: 'p2',
    moves: [
      { tile: 0, owner: '1' },
      { tile: 3, owner: '2' },
    ],
  }
}

/**
 * use tic-tac-toe as the test game
 */

type TestMove = { tile: number; owner: TileOwner }
type TestState = Array<TileState>

type TileState = TileOwner | undefined

type TileOwner = '1' | '2'

function ticTacToeRules(): GameRules<TestState, TestMove> {
  return {
    isValidMove(s, m) {
      return m.tile >= 0 && m.tile < 9 && s[m.tile] === undefined
    },
    onMove(s, m) {
      if (this.isValidMove(s, m)) {
        return s.map((tile, index) => {
          if (index === m.tile) {
            return m.owner
          } else {
            return tile
          }
        })
      } else {
        return s
      }
    },
    getOutcome(s) {
      if (s[0] !== undefined && s[0] === s[1] && s[0] === s[2]) {
        if (s[0] === '1') {
          return winner({ player: '1' })
        } else {
          return winner({ player: '2' })
        }
      } else {
        if (s.every((v) => v !== undefined)) {
          return tie()
        } else {
          return unfinished()
        }
      }
    },
    initState() {
      return [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ]
    },
  }
}
