import { FixtureFactory } from '../../../../test_framework/TestRunner'
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
  const playerRepo = createPlayerRepoInMemory()
  const matchmaker = createMatchmakerFifo()

  return (eventLog) => {
    const matchmakingService = createMatchmakingService(
      playerRepo,
      eventLog,
      matchmaker,
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
