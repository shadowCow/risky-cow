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
  onCommand: (command: Command) => Promise<CommandResult>
}

export type Command = JoinQueueRequest | LeaveQueueRequest

export type JoinQueueRequest = {
  kind: 'JoinQueueRequest'
  getPlayerId: () => string
}
export type LeaveQueueRequest = {
  kind: 'LeaveQueueRequest'
  getPlayerId: () => string
}

export type CommandResult = void

export function createMatchmakingService(
  playerRepo: PlayerRepo,
  eventLog: Array<PlayerQueueEvent>,
  matchmaker: MatchmakingAlgorithm,
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
