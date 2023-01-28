import { MatchmakingAlgorithm } from './ports/MatchmakingAlgorithm'
import {
  Event as PlayerQueueEvent,
  State as PlayerQueueState,
  apply as PlayerQueueApply,
  createPlayerQueueState,
  playerLeftQueue,
  getQueueLength,
  playerJoinedQueue,
  matchMade,
} from './model/PlayerQueue'
import { PlayerRepo } from './ports/PlayerRepo'
import { hydrate } from './ports/EventStore'
import { GameService } from './ports/GameService'
import { IdGenerator } from './ports/IdGenerator'

export type MatchmakingService = {
  onCommand: (command: Command) => Promise<CommandResult>
}

export type Command = JoinRandomGameRequest | LeaveQueueRequest

export type JoinRandomGameRequest = {
  kind: 'JoinRandomGameRequest'
  getPlayerId: () => string
}
export type LeaveQueueRequest = {
  kind: 'LeaveQueueRequest'
  getPlayerId: () => string
}

export type CommandResult =
  | JoinedQueue
  | FailedToJoinQueue
  | JoinedNewGame
  | FoundExistingGame
  | LeftQueue
  | FailedToLeaveQueue

export type JoinedQueue = {
  kind: 'JoinedQueue'
}
export function joinedQueue(): JoinedQueue {
  return {
    kind: 'JoinedQueue',
  }
}
export type FailedToJoinQueue = {
  kind: 'FailedToJoinQueue'
}
export function failedToJoinQueue(): FailedToJoinQueue {
  return {
    kind: 'FailedToJoinQueue',
  }
}
export type JoinedNewGame = {
  kind: 'JoinedNewGame'
  gameId: string
}
export function joinedNewGame(gameId: string): JoinedNewGame {
  return {
    kind: 'JoinedNewGame',
    gameId,
  }
}
export type FoundExistingGame = {
  kind: 'FoundExistingGame'
  gameId: string
}
export function foundExistingGame(gameId: string): FoundExistingGame {
  return {
    kind: 'FoundExistingGame',
    gameId,
  }
}
export type LeftQueue = {
  kind: 'LeftQueue'
}
export function leftQueue(): LeftQueue {
  return {
    kind: 'LeftQueue',
  }
}
export type FailedToLeaveQueue = {
  kind: 'FailedToLeaveQueue'
}

export function createMatchmakingService(
  playerRepo: PlayerRepo,
  gameService: GameService,
  eventLog: Array<PlayerQueueEvent>,
  matchmaker: MatchmakingAlgorithm,
  idGenerator: IdGenerator,
  maxQueueLength: number,
): MatchmakingService {
  const defaultPlayerQueue = createPlayerQueueState()

  let playerQueue = hydrate(defaultPlayerQueue, PlayerQueueApply, eventLog)

  return {
    async onCommand(command) {
      switch (command.kind) {
        case 'JoinRandomGameRequest':
          const player = await playerRepo.getPlayerById(command.getPlayerId())

          if (player) {
            const existingGameId = await gameService.getGameIdByPlayerId(
              player.id,
            )

            if (existingGameId) {
              return foundExistingGame(existingGameId)
            } else {
              if (getQueueLength(playerQueue) >= maxQueueLength) {
                return failedToJoinQueue()
              } else {
                playerQueue = PlayerQueueApply(
                  playerQueue,
                  playerJoinedQueue(player),
                )

                const maybeMatch = matchmaker(playerQueue)
                if (maybeMatch) {
                  const matchId = idGenerator.uuid()
                  const matchMadeEvent = matchMade(
                    matchId,
                    maybeMatch.player1Id,
                    maybeMatch.player2Id,
                  )
                  playerQueue = PlayerQueueApply(playerQueue, matchMadeEvent)

                  gameService.onMatchMade(matchMadeEvent)

                  return joinedNewGame(matchId)
                } else {
                  return joinedQueue()
                }
              }
            }
          } else {
            return failedToJoinQueue()
          }
        case 'LeaveQueueRequest':
          playerQueue = PlayerQueueApply(
            playerQueue,
            playerLeftQueue(command.getPlayerId()),
          )

          return Promise.resolve(leftQueue())
        default:
          const _exhaust: never = command
          return _exhaust
      }
    },
  }
}
