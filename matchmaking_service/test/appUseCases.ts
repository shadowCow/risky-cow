import { UseCase } from '../../test_framework/use_cases/UseCase'
import { ValidationExecutor } from '../../test_framework/ValidationExecutor'
import { createGameServiceInMemory } from '../src/adapters/GameServiceInMemory'
import { createIdGeneratorAutoIncrement } from '../src/adapters/IdGeneratorAutoIncrement'
import { createMatchmakerFifo } from '../src/adapters/MatchmakerFifo'
import { createPlayerRepoInMemory } from '../src/adapters/PlayerRepoInMemory'
import {
  Command,
  CommandResult,
  createMatchmakingService,
  joinedQueue,
  joinRandomGameRequest,
} from '../src/domain/MatchmakingService'
const assert = require('assert')

export function createUseCases(): Array<UseCase<Command, CommandResult>> {
  return [
    {
      description: 'attempt to join a random game with no-one else queued',
      Given: freshSystem,
      When: joinRandomGameRequest('p1'),
      Then: joinedQueue(),
    },
  ]
}

const freshSystem: UseCase<Command, CommandResult>['Given'] = () => {
  const idGenerator = createIdGeneratorAutoIncrement()
  const playerRepo = createPlayerRepoInMemory()
  const gameService = createGameServiceInMemory(idGenerator)
  const matchmaker = createMatchmakerFifo()

  const eventLog = []
  const matchmakingService = createMatchmakingService(
    playerRepo,
    gameService,
    eventLog,
    matchmaker,
    idGenerator,
    1000,
  )

  return {
    commandExecutor: (command) => matchmakingService.onCommand(command),
  }
}
