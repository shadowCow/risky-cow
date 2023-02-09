import { UseCase } from '../../test_framework/use_cases/UseCase'
import { createGameServiceInMemory } from '../src/adapters/GameServiceInMemory'
import { createIdGeneratorAutoIncrement } from '../src/adapters/IdGeneratorAutoIncrement'
import { createMatchmakerFifo } from '../src/adapters/MatchmakerFifo'
import { createPlayerRepoInMemory } from '../src/adapters/PlayerRepoInMemory'
import {
  Command,
  CommandResult,
  createMatchmakingService,
  joinedNewGame,
  joinedQueue,
  joinRandomGameRequest,
  leaveQueueRequest,
  leftQueue,
} from '../src/domain/MatchmakingService'
import {
  Event as PlayerQueueEvent,
  playerJoinedQueue,
} from '../src/domain/model/PlayerQueue'

export function createUseCases(): Array<UseCase<Command, CommandResult>> {
  return [
    {
      description: 'attempt to join a random game with no-one else queued',
      Given: freshSystem,
      When: joinRandomGameRequest('p1'),
      Then: joinedQueue(),
    },
    {
      description: 'attempt to join a random game with someone else queued',
      Given: onePlayerQueued,
      When: joinRandomGameRequest('p2'),
      Then: joinedNewGame('0'),
    },
    {
      description: 'leave the queue',
      Given: onePlayerQueued,
      When: leaveQueueRequest('p1'),
      Then: leftQueue(),
    },
  ]
}

const freshSystem: UseCase<Command, CommandResult>['Given'] =
  systemFromEventLog([])
const onePlayerQueued = systemFromEventLog([
  playerJoinedQueue({
    id: 'p1',
    displayName: 'bill',
    rating: 1,
  }),
])

function systemFromEventLog(
  eventLog: Array<PlayerQueueEvent>,
): UseCase<Command, CommandResult>['Given'] {
  const idGenerator = createIdGeneratorAutoIncrement()
  const playerRepo = createPlayerRepoInMemory()
  const gameService = createGameServiceInMemory(idGenerator)
  const matchmaker = createMatchmakerFifo()

  const matchmakingService = createMatchmakingService(
    playerRepo,
    gameService,
    eventLog,
    matchmaker,
    idGenerator,
    1000,
  )

  return () => ({
    commandExecutor: (command) => matchmakingService.onCommand(command),
  })
}
