import { CommandExecutor } from './CommandExecutor'
import {
  createFailResult,
  createPassResult,
  TestReporter,
  TestResult,
} from './reporter/Reporter'
import { UseCase } from './use_cases/UseCase'
import { ValidationExecutor } from './ValidationExecutor'

export type TestRunner<Event, Command, Validation> = {
  run(useCases: Array<UseCase<Event, Command, Validation>>): Promise<void>
}

export function createTestRunner<Event, Command, Validation>(
  reporter: TestReporter,
  fixtureFactory: FixtureFactory<Event, Command, Validation>,
): TestRunner<Event, Command, Validation> {
  return {
    async run(useCases: Array<UseCase<Event, Command, Validation>>) {
      for (let i = 0; i < useCases.length; i++) {
        const result = await runUseCase(useCases[i], fixtureFactory)
        reporter.report(result)
      }
    },
  }
}

async function runUseCase<E, C, V>(
  useCase: UseCase<E, C, V>,
  fixtureFactory: FixtureFactory<E, C, V>,
): Promise<TestResult> {
  try {
    const fixture = fixtureFactory(useCase.Given)

    await fixture.commandExecutor(useCase.When)

    useCase.Then.forEach((validation) => fixture.validationExecutor(validation))

    return createPassResult(useCase.description)
  } catch (ex) {
    return createFailResult(useCase.description, ex)
  }
}

export type FixtureFactory<Event, Command, Validation> = (
  eventLog: Array<Event>,
) => {
  commandExecutor: CommandExecutor<Command>
  validationExecutor: ValidationExecutor<Validation>
}
