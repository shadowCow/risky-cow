import { RequestResponse } from '../event/request_response'
import { adt } from '../fp/adt'

export type GamesHistory<M> = RequestResponse<
  GamesHistoryRequest<M>,
  GamesHistoryResponse<M>
>

export type GamesHistoryRequest<M> = GameCompleted<M> | GameById | ListGames

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

export const gameById = adt<'GameById', { id: string }>('GameById')
export type GameById = ReturnType<typeof gameById>

export const listGames = adt<'ListGames', void>('ListGames')
export type ListGames = ReturnType<typeof listGames>

export type GamesHistoryResponse<M> =
  | GameRecorded
  | GameByIdSuccess<M>
  | GameNotFound
  | ListGamesSuccess<M>

export const gameRecorded = adt<'GameRecorded', { id: string }>('GameRecorded')
export type GameRecorded = ReturnType<typeof gameRecorded>

export const GameByIdSuccessKind: 'GameByIdSuccess' = 'GameByIdSuccess'
export type GameByIdSuccess<T> = {
  kind: typeof GameByIdSuccessKind
  value: {
    game: GameHistory<T>
  }
}
export function gameByIdSuccess<T>(
  value: GameByIdSuccess<T>['value'],
): GameByIdSuccess<T> {
  return {
    kind: 'GameByIdSuccess',
    value,
  }
}

export const gameNotFound = adt<'GameNotFound', { id: string }>('GameNotFound')
export type GameNotFound = ReturnType<typeof gameNotFound>

export const ListGamesSuccessKind: 'ListGamesSuccess' = 'ListGamesSuccess'
export type ListGamesSuccess<T> = {
  kind: typeof ListGamesSuccessKind
  value: {
    games: Array<GameHistory<T>>
  }
}
export function listGamesSuccess<T>(
  value: ListGamesSuccess<T>['value'],
): ListGamesSuccess<T> {
  return {
    kind: 'ListGamesSuccess',
    value,
  }
}

export type GameHistory<M> = {
  gameId: string
  player1Id: string
  player2Id: string
  moves: Array<M>
}
