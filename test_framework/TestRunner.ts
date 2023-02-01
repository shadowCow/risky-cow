import {
  createFailResult,
  createPassResult,
  TestReporter,
  TestResult,
} from './reporter/Reporter'
import { UseCase } from './use_cases/UseCase'
const assert = require('assert')

export type TestRunner<Request, Response> = {
  run(useCases: Array<UseCase<Request, Response>>): Promise<void>
}

export function createTestRunner<Request, Response>(
  reporter: TestReporter,
): TestRunner<Request, Response> {
  return {
    async run(useCases: Array<UseCase<Request, Response>>) {
      for (let i = 0; i < useCases.length; i++) {
        const result = await runUseCase(useCases[i])
        reporter.report(result)
      }
    },
  }
}

async function runUseCase<Request, Response>(
  useCase: UseCase<Request, Response>,
): Promise<TestResult> {
  try {
    const { commandExecutor } = useCase.Given()

    const response = await commandExecutor(useCase.When)

    assert.deepStrictEqual(useCase.Then, response)

    return createPassResult(useCase.description)
  } catch (ex) {
    return createFailResult(useCase.description, ex)
  }
}
