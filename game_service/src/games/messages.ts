import { adt, AdtVariant, AdtVariantConstructor } from '../fp/adt'

export type GamesInput<M> = StartGame | MakeMove<M> | ConcedeGame

export const startGame = adt<
  'StartGame',
  { player1Id: string; player2Id: string }
>('StartGame')
export type StartGame = ReturnType<typeof startGame>

export const MakeMoveKind: 'MakeMove' = 'MakeMove'
export type MakeMove<M> = {
  kind: typeof MakeMoveKind
  value: {
    move: M
  }
}
export function makeMove<M>(value: MakeMove<M>['value']): MakeMove<M> {
  return {
    kind: 'MakeMove',
    value,
  }
}

export const concedeGame = adt<'ConcedeGame', { playerId: string }>(
  'ConcedeGame',
)
export type ConcedeGame = ReturnType<typeof concedeGame>

export type GamesOutput = {}

export const makeMoveSuccess = adt<'MakeMoveSuccess', void>('MakeMoveSuccess')
export type MakeMoveSuccess = ReturnType<typeof makeMoveSuccess>

export const makeMoveFailure = adt<'MakeMoveFailure', void>('MakeMoveFailure')
export type MakeMoveFailure = ReturnType<typeof makeMoveFailure>

export const gameCompleted = adt<'GameCompleted', void>('GameCompleted')
export type GameCompleted = ReturnType<typeof gameCompleted>
