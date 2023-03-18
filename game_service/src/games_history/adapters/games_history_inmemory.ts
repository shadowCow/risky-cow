import { rejectWith, resolveWith } from '../../event/request_response.testutil'
import { assertNever } from '../../fp/pattern_matching'
import {
  gameById,
  gameByIdSuccess,
  gameCompleted,
  GameCompletedKind,
  GameHistory,
  gameNotFound,
  gameRecorded,
  GamesHistory,
  listGames,
  listGamesSuccess,
} from '../games_history'

export function createGamesHistoryInMemory<Move>(
  games?: Array<GameHistory<Move>>,
): GamesHistory<Move> {
  const gamesById: { [id: string]: GameHistory<Move> } = {}

  if (games !== undefined) {
    games.forEach((game) => (gamesById[game.gameId] = game))
  }

  return {
    ask(i) {
      switch (i.kind) {
        case GameCompletedKind:
          gamesById[i.value.game.gameId] = i.value.game

          return resolveWith(gameRecorded({ id: i.value.game.gameId }))
        case gameById.kind:
          const maybeGame = gamesById[i.value.id]

          if (maybeGame !== undefined) {
            return resolveWith(gameByIdSuccess({ game: maybeGame }))
          } else {
            return resolveWith(gameNotFound({ id: i.value.id }))
          }
        case listGames.kind:
          return resolveWith(
            listGamesSuccess({ games: Array.from(Object.values(gamesById)) }),
          )
        default:
          assertNever(i)
      }
    },
  }
}
