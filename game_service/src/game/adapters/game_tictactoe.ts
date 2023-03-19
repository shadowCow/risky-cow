import { GameRules, invalidMove, unfinished } from '../game'

export function createGameRulesTicTacToe(): GameRules<
  TicTacToeState,
  TicTacToeMove
> {
  return {
    isValidMove(s, m) {
      return false
    },
    initState() {
      const state: TicTacToeState = []
      state.fill(undefined, 0, 9)

      return state
    },
    onMove(s, m) {
      return invalidMove({ reason: 'not implemented' })
    },
    getOutcome(s) {
      return unfinished()
    },
  }
}

export type TicTacToeState = Array<TileState>

export type TileState = TileOwner | undefined

export type TileOwner = '1' | '2'

export type TicTacToeMove = {}
