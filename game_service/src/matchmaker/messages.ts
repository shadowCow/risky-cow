import { adt } from '../fp/adt'

export type MatchmakerInput = FindMatch | LeaveMatchmaking

export const findMatch = adt<'FindMatch', { playerId: string }>('FindMatch')
export type FindMatch = ReturnType<typeof findMatch>

export const leaveMatchmaking = adt<'LeaveMatchmaking', { playerId: string }>(
  'LeaveMatchmaking',
)
export type LeaveMatchmaking = ReturnType<typeof leaveMatchmaking>

export type MatchmakerOutput =
  | PlayerInMatchmakingQueue
  | MatchMade
  | LeftMatchmaking

export const playerInMatchmakingQueue = adt<
  'PlayerInMatchmakingQueue',
  { playerId: string }
>('PlayerInMatchmakingQueue')
export type PlayerInMatchmakingQueue = ReturnType<
  typeof playerInMatchmakingQueue
>

export const matchMade = adt<
  'MatchMade',
  { player1Id: string; player2Id: string }
>('MatchMade')
export type MatchMade = ReturnType<typeof matchMade>

export const leftMatchmaking = adt<'LeftMatchmaking', { playerId: string }>(
  'LeftMatchmaking',
)
export type LeftMatchmaking = ReturnType<typeof leftMatchmaking>
