import { adt } from '../fp/adt'
import { PlayerStatus } from './game_service'

type GameServiceState = {
  activeRequests: Dictionary<RequestFlow>
  activePlayers: Dictionary<PlayerStatus>
}

type Dictionary<V> = {
  [key: string]: V
}

type RequestFlow =
  | JoinGameRequestFlow
  | PlayerStatusRequestFlow
  | LeaveQueueRequestFlow
  | MakeMoveRequestFlow
  | ConcedeGameRequestFlow

export const joinGameRequestFlow = adt<
  'JoinGameRequestFlow',
  {
    phase: AwaitingAuthentication | AwaitingPlayerFetch | AwaitingMatchmaking
  }
>('JoinGameRequestFlow')
export type JoinGameRequestFlow = ReturnType<typeof joinGameRequestFlow>

export const playerStatusRequestFlow = adt<'PlayerStatusRequestFlow', void>(
  'PlayerStatusRequestFlow',
)
export type PlayerStatusRequestFlow = ReturnType<typeof playerStatusRequestFlow>

export const leaveQueueRequestFlow = adt<'LeaveQueueRequestFlow', void>(
  'LeaveQueueRequestFlow',
)
export type LeaveQueueRequestFlow = ReturnType<typeof leaveQueueRequestFlow>

export const makeMoveRequestFlow = adt<'MakeMoveRequestFlow', void>(
  'MakeMoveRequestFlow',
)
export type MakeMoveRequestFlow = ReturnType<typeof makeMoveRequestFlow>

export const concedeGameRequestFlow = adt<'ConcedeGameRequestFlow', void>(
  'ConcedeGameRequestFlow',
)
export type ConcedeGameRequestFlow = ReturnType<typeof concedeGameRequestFlow>

export const awaitingAuthentication = adt<'AwaitingAuthentication', void>(
  'AwaitingAuthentication',
)
export type AwaitingAuthentication = ReturnType<typeof awaitingAuthentication>

export const awaitingPlayerFetch = adt<'AwaitingPlayerFetch', void>(
  'AwaitingPlayerFetch',
)
export type AwaitingPlayerFetch = ReturnType<typeof awaitingPlayerFetch>

export const awaitingMatchmaking = adt<'AwaitingMatchmaking', void>(
  'AwaitingMatchmaking',
)
export type AwaitingMatchmaking = ReturnType<typeof awaitingMatchmaking>

export const awaitingGameAction = adt<'AwaitingGameAction', void>(
  'AwaitingGameAction',
)
export type AwaitingGameAction = ReturnType<typeof awaitingGameAction>
