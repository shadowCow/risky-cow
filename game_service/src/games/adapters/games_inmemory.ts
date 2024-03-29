import { rejectWith, resolveWith } from '../../event/request_response.testutil'
import { assertNever } from '../../fp/pattern_matching'
import {
  GameRules,
  invalidMove,
  madeMove,
  MadeMoveKind,
  moveEndedGame,
  MoveEndedGameKind,
  tie,
  unfinished,
  winner,
} from '../../game/game'
import {
  concedeGame,
  currentGame,
  currentGameNotFound,
  currentGameSuccess,
  gameAlreadyExists,
  gameCompleted,
  GameHistory,
  Games,
  GamesInput,
  GamesOutput,
  gameStarted,
  MakeMoveKind,
  makeMoveSuccess,
  moveWasInvalid,
  startGame,
  startGameFailure,
} from '../games'

export function createGamesInMemory<S, M>(
  gameRules: GameRules<S, M>,
  games?: Array<GameHistory<M>>,
): Games<M> {
  const gamesById: GamesById<S, M> = {}
  if (games !== undefined) {
    games.forEach(
      (game) =>
        (gamesById[game.gameId] = {
          ...game,
          state: applyMoves(gameRules.initState(), gameRules, game.moves),
        }),
    )
  }

  return {
    ask(i) {
      switch (i.kind) {
        case startGame.kind:
          if (gamesById[i.value.gameId] === undefined) {
            gamesById[i.value.gameId] = {
              ...i.value,
              moves: [],
              state: gameRules.initState(),
            }

            return resolveWith(
              gameStarted({
                id: i.value.gameId,
                player1Id: i.value.player1Id,
                player2Id: i.value.player2Id,
              }),
            )
          } else {
            return resolveWith(
              startGameFailure({
                reason: gameAlreadyExists({ gameId: i.value.gameId }),
              }),
            )
          }
        case currentGame.kind: {
          const maybeGame = getGameByPlayerId(gamesById, i.value.playerId)
          if (maybeGame !== undefined) {
            return resolveWith(
              currentGameSuccess({ game: gameDataWithoutState(maybeGame) }),
            )
          } else {
            return resolveWith(
              currentGameNotFound({ playerId: i.value.playerId }),
            )
          }
        }
        case MakeMoveKind: {
          const maybeGame = gamesById[i.value.gameId]
          if (maybeGame !== undefined) {
            const result = gameRules.onMove(maybeGame.state, i.value.move)

            switch (result.kind) {
              case MadeMoveKind:
                maybeGame.state = result.value.state
                maybeGame.moves.push(i.value.move)

                return resolveWith(
                  makeMoveSuccess({
                    gameId: maybeGame.gameId,
                    playerId: i.value.playerId,
                    move: i.value.move,
                  }),
                )
              case MoveEndedGameKind:
                maybeGame.state = result.value.state
                maybeGame.moves.push(i.value.move)

                return resolveWith(
                  gameCompleted({
                    game: gameDataWithoutState(maybeGame),
                  }),
                )
              case invalidMove.kind:
                return resolveWith(
                  moveWasInvalid({ reason: result.value.reason }),
                )
              default:
                assertNever(result)
            }
          } else {
            return resolveWith(
              currentGameNotFound({ playerId: i.value.playerId }),
            )
          }
        }
        case concedeGame.kind: {
          const maybeGame = gamesById[i.value.gameId]
          if (maybeGame !== undefined) {
            return resolveWith(
              gameCompleted({ game: gameDataWithoutState(maybeGame) }),
            )
          } else {
            return resolveWith(
              currentGameNotFound({ playerId: i.value.playerId }),
            )
          }
        }
        default:
          assertNever(i)
      }
    },
  }
}

type GamesById<S, M> = { [id: string]: GameData<S, M> }

function getGameByPlayerId<S, M>(
  gamesById: GamesById<S, M>,
  playerId: string,
): GameData<S, M> | undefined {
  return Object.values(gamesById).find(
    (game) => game.player1Id === playerId || game.player2Id === playerId,
  )
}

type GameData<S, M> = GameHistory<M> & {
  state: S
}

function applyMoves<S, M>(
  gameState: S,
  gameRules: GameRules<S, M>,
  moves: Array<M>,
): S {
  return moves.reduce((state, move) => {
    const result = gameRules.onMove(state, move)

    switch (result.kind) {
      case MadeMoveKind:
      case MoveEndedGameKind:
        return result.value.state
      case invalidMove.kind:
        return state
      default:
        assertNever(result)
    }
  }, gameState)
}

function gameDataWithoutState<S, M>(gameData: GameData<S, M>): GameHistory<M> {
  return {
    gameId: gameData.gameId,
    player1Id: gameData.player1Id,
    player2Id: gameData.player2Id,
    moves: gameData.moves,
  }
}
