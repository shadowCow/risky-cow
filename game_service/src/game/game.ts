import { adt } from '../fp/adt'

export type GameRules<S, M> = {
  isValidMove: (s: S, m: M) => boolean
  initState: () => S
  onMove: (s: S, m: M) => S
  getOutcome: (s: S) => GameOutcome
}

export type GameOutcome = Unfinished | Tie | Winner

export const unfinished = adt<'Unfinished', void>('Unfinished')
export type Unfinished = ReturnType<typeof unfinished>

export const tie = adt<'Tie', void>('Tie')
export type Tie = ReturnType<typeof tie>

export const winner = adt<'Winner', { player: PlayerSlot }>('Winner')
export type Winner = ReturnType<typeof winner>

export type PlayerSlot = '1' | '2'
