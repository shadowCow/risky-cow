import { adt } from '../fp/adt'

export type GameRules<S, M> = {
  isValidMove: (s: S, m: M) => boolean
  initState: () => S
  onMove: (s: S, m: M) => MoveResult<S>
  getOutcome: (s: S) => GameOutcome
}

export type MoveResult<S> = MadeMove<S> | InvalidMove | MoveEndedGame<S>

export const MadeMoveKind: 'MadeMove' = 'MadeMove'
export type MadeMove<S> = {
  kind: typeof MadeMoveKind
  value: {
    state: S
  }
}
export function madeMove<S>(value: MadeMove<S>['value']): MadeMove<S> {
  return {
    kind: 'MadeMove',
    value,
  }
}

export const invalidMove = adt<'InvalidMove', { reason: string }>('InvalidMove')
export type InvalidMove = ReturnType<typeof invalidMove>

export const MoveEndedGameKind: 'MoveEndedGame' = 'MoveEndedGame'
export type MoveEndedGame<S> = {
  kind: typeof MoveEndedGameKind
  value: {
    state: S
  }
}
export function moveEndedGame<S>(
  value: MoveEndedGame<S>['value'],
): MoveEndedGame<S> {
  return {
    kind: 'MoveEndedGame',
    value,
  }
}

export type GameOutcome = Unfinished | Tie | Winner

export const unfinished = adt<'Unfinished', void>('Unfinished')
export type Unfinished = ReturnType<typeof unfinished>

export const tie = adt<'Tie', void>('Tie')
export type Tie = ReturnType<typeof tie>

export const winner = adt<'Winner', { player: PlayerSlot }>('Winner')
export type Winner = ReturnType<typeof winner>

export type PlayerSlot = '1' | '2'
