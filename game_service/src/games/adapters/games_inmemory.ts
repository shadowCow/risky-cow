import { rejectWith } from '../../event/request_response.testutil'
import { assertNever } from '../../fp/pattern_matching'
import { GameRules } from '../../game/game'
import {
  concedeGame,
  currentGame,
  GameHistory,
  Games,
  GamesInput,
  GamesOutput,
  MakeMoveKind,
  startGame,
} from '../games'

export function createGamesInMemory<S, M>(
  gameRules: GameRules<S, M>,
  games?: Array<GameHistory<M>>,
): Games<M> {
  return {
    ask(i) {
      switch (i.kind) {
        case startGame.kind:
          return rejectWith('not implemented')
        case currentGame.kind:
          return rejectWith('not implemented')
        case MakeMoveKind:
          return rejectWith('not implemented')
        case concedeGame.kind:
          return rejectWith('not implemented')
        default:
          assertNever(i)
      }
    },
  }
}
