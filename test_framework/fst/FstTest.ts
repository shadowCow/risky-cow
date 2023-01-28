import { Fst } from '../../model/src/Fst'
import {
  createFailResult,
  createPassResult,
  TestReporter,
  TestResult,
} from '../reporter/Reporter'
const assert = require('assert')

export type FstTestRunner<I, O> = {
  run(testCases: Array<FstTestCase<I, O>>): void
}

export function createFstTestRunner<I, O>(
  reporter: TestReporter,
  fstFactory: () => Fst<I, O>,
): FstTestRunner<I, O> {
  return {
    run(testCases) {
      testCases.forEach((testCase) => {
        try {
          const fst = fstFactory()

          testCase.Given.forEach((i) => fst.onInput(i))

          const output = fst.onInput(testCase.When)

          assert.deepStrictEqual(output, testCase.Then)

          reporter.report(createPassResult(testCase.description))
        } catch (ex) {
          reporter.report(createFailResult(testCase.description, ex))
        }
      })
    },
  }
}

export type FstTestCase<I, O> = {
  description: string
  Given: Array<I>
  When: I
  Then: Array<O>
}
