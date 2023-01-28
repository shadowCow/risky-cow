import { MatchmakingAlgorithm } from './ports/MatchmakingAlgorithm'
import {
  Event as PlayerQueueEvent,
  State as PlayerQueueState,
  apply as PlayerQueueApply,
  createPlayerQueueState,
} from './model/PlayerQueue'
import { PlayerRepo } from './ports/PlayerRepo'
import { hydrate } from './ports/EventStore'

export type MatchmakingService = {
  onCommand: (command: Command) => void
}

export type Command = JoinQueueRequest | LeaveQueueRequest

export type JoinQueueRequest = {
  kind: 'JoinQueueRequest'
  playerId: string
}
export type LeaveQueueRequest = {
  kind: 'LeaveQueueRequest'
  playerId: string
}

export function createMatchmakingService(
  playerRepo: PlayerRepo,
  eventLog: Array<PlayerQueueEvent>,
  matchmaker: MatchmakingAlgorithm,
  eventPublisher: (e: PlayerQueueEvent) => void,
): MatchmakingService {
  const defaultPlayerQueue = createPlayerQueueState()

  const playerQueue = hydrate(defaultPlayerQueue, PlayerQueueApply, eventLog)

  return {
    onCommand(command) {
      switch (command.kind) {
        case 'JoinQueueRequest':
          break
        case 'LeaveQueueRequest':
          break
        default:
          const _exhaust: never = command
          return _exhaust
      }
    },
  }
}
