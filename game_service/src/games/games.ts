import { RequestResponse } from '../event/request_response'
import { adt } from '../fp/adt'

export type Games<M> = RequestResponse<GamesInput<M>, GamesOutput<M>>

export type GamesInput<M> = StartGame | CurrentGame | MakeMove<M> | ConcedeGame

export const startGame = adt<
  'StartGame',
  { gameId: string; player1Id: string; player2Id: string }
>('StartGame')
export type StartGame = ReturnType<typeof startGame>

export const currentGame = adt<'CurrentGame', { playerId: string }>(
  'CurrentGame',
)
export type CurrentGame = ReturnType<typeof currentGame>

export const MakeMoveKind: 'MakeMove' = 'MakeMove'
export type MakeMove<M> = {
  kind: typeof MakeMoveKind
  value: {
    gameId: string
    playerId: string
    move: M
  }
}
export function makeMove<M>(value: MakeMove<M>['value']): MakeMove<M> {
  return {
    kind: 'MakeMove',
    value,
  }
}

export const concedeGame = adt<
  'ConcedeGame',
  { gameId: string; playerId: string }
>('ConcedeGame')
export type ConcedeGame = ReturnType<typeof concedeGame>

export type GamesOutput<M> =
  | GameStarted
  | StartGameFailure
  | CurrentGameSuccess<M>
  | CurrentGameNotFound
  | MakeMoveSuccess<M>
  | MoveWasInvalid
  | GameCompleted<M>

export const gameStarted = adt<
  'GameStarted',
  {
    id: string
    player1Id: string
    player2Id: string
  }
>('GameStarted')
export type GameStarted = ReturnType<typeof gameStarted>

export const startGameFailure = adt<
  'StartGameFailure',
  { reason: StartGameFailureReason }
>('StartGameFailure')
export type StartGameFailure = ReturnType<typeof startGameFailure>

export type StartGameFailureReason = GameAlreadyExists
export const gameAlreadyExists = adt<'GameAlreadyExists', { gameId: string }>(
  'GameAlreadyExists',
)
export type GameAlreadyExists = ReturnType<typeof gameAlreadyExists>

export const CurrentGameSuccessKind: 'CurrentGameSuccess' = 'CurrentGameSuccess'
export type CurrentGameSuccess<T> = {
  kind: typeof CurrentGameSuccessKind
  value: {
    game: GameHistory<T>
  }
}
export function currentGameSuccess<T>(
  value: CurrentGameSuccess<T>['value'],
): CurrentGameSuccess<T> {
  return {
    kind: 'CurrentGameSuccess',
    value,
  }
}

export const currentGameNotFound = adt<
  'CurrentGameNotFound',
  { playerId: string }
>('CurrentGameNotFound')
export type CurrentGameNotFound = ReturnType<typeof currentGameNotFound>

export const MakeMoveSuccessKind: 'MakeMoveSuccess' = 'MakeMoveSuccess'
export type MakeMoveSuccess<T> = {
  kind: typeof MakeMoveSuccessKind
  value: {
    gameId: string
    playerId: string
    move: T
  }
}
export function makeMoveSuccess<T>(
  value: MakeMoveSuccess<T>['value'],
): MakeMoveSuccess<T> {
  return {
    kind: 'MakeMoveSuccess',
    value,
  }
}

export const moveWasInvalid = adt<'MoveWasInvalid', { reason: string }>(
  'MoveWasInvalid',
)
export type MoveWasInvalid = ReturnType<typeof moveWasInvalid>

export const GameCompletedKind: 'GameCompleted' = 'GameCompleted'
export type GameCompleted<T> = {
  kind: typeof GameCompletedKind
  value: {
    game: GameHistory<T>
  }
}
export function gameCompleted<T>(
  value: GameCompleted<T>['value'],
): GameCompleted<T> {
  return {
    kind: 'GameCompleted',
    value,
  }
}

export type GameHistory<M> = {
  gameId: string
  player1Id: string
  player2Id: string
  moves: Array<M>
}
