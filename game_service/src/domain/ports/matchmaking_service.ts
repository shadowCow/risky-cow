import { EventProcessor } from '../../event/event_processor'
import { adt } from '../../fp/adt'

export type MatchmakingService = EventProcessor<
  MatchmakingServiceInput,
  MatchmakingServiceOutput
>

export type MatchmakingServiceInput = FindMatch | LeaveMatchmaking

export const findMatch = adt<'FindMatch', { playerId: string }>('FindMatch')
export type FindMatch = ReturnType<typeof findMatch>

export const leaveMatchmaking = adt<'LeaveMatchmaking', { playerId: string }>(
  'LeaveMatchmaking',
)
export type LeaveMatchmaking = ReturnType<typeof leaveMatchmaking>

export type MatchmakingServiceOutput =
  | PlayerInMatchmakingQueue
  | MatchmakingQueueFull
  | MatchMade
  | LeftMatchmaking

export const playerInMatchmakingQueue = adt<
  'PlayerInMatchmakingQueue',
  { playerId: string }
>('PlayerInMatchmakingQueue')
export type PlayerInMatchmakingQueue = ReturnType<
  typeof playerInMatchmakingQueue
>

export const matchmakingQueueFull = adt<'MatchmakingQueueFull', void>(
  'MatchmakingQueueFull',
)
export type MatchmakingQueueFull = ReturnType<typeof matchmakingQueueFull>

export const matchMade = adt<
  'MatchMade',
  { player1Id: string; player2Id: string }
>('MatchMade')
export type MatchMade = ReturnType<typeof matchMade>

export const leftMatchmaking = adt<'LeftMatchmaking', { playerId: string }>(
  'LeftMatchmaking',
)
export type LeftMatchmaking = ReturnType<typeof leftMatchmaking>
