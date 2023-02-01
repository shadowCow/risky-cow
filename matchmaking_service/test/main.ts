import { createConsoleReporter } from '../../test_framework/reporter/ConsoleReporter'
import { createTestRunner } from '../../test_framework/TestRunner'
import { Command, CommandResult } from '../src/domain/MatchmakingService'
import { createUseCases } from './appUseCases'

const reporter = createConsoleReporter()
const testRunner = createTestRunner<Command, CommandResult>(reporter)

testRunner
  .run(createUseCases())
  .then(() => console.log('completed'))
  .catch((err) => console.log('completed with error', err))
