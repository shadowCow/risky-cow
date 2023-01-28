import { FixtureFactory } from '../../../../test_framework/TestRunner'
import { createGameServiceInMemory } from '../../../src/adapters/GameServiceInMemory'
import { createIdGeneratorAutoIncrement } from '../../../src/adapters/IdGeneratorAutoIncrement'
import { createMatchmakerFifo } from '../../../src/adapters/MatchmakerFifo'
import { createPlayerRepoInMemory } from '../../../src/adapters/PlayerRepoInMemory'
import {
  Command,
  CommandResult,
  createMatchmakingService,
} from '../../../src/domain/MatchmakingService'
import { Event as PlayerQueueEvent } from '../../../src/domain/model/PlayerQueue'
import { Validations } from '../../Validations'

export function createFixtureFactoryDomain(): FixtureFactory<
  PlayerQueueEvent,
  Command,
  Validations
> {
  const idGenerator = createIdGeneratorAutoIncrement()
  const playerRepo = createPlayerRepoInMemory()
  const gameService = createGameServiceInMemory(idGenerator)
  const matchmaker = createMatchmakerFifo()

  return (eventLog) => {
    const matchmakingService = createMatchmakingService(
      playerRepo,
      gameService,
      eventLog,
      matchmaker,
      idGenerator,
      1000,
    )

    let lastResult: CommandResult | undefined = undefined

    return {
      commandExecutor: async (command) => {
        lastResult = await matchmakingService.onCommand(command)
      },
      validationExecutor: (validation) => {
        switch (validation.kind) {
          case 'PlayerIsInQueue':
            break
          case 'PlayerIsNotInQueue':
            break
          case 'MatchMade':
            break
          default:
            const _exhaust: never = validation
            return validation
        }
      },
    }
  }
}
