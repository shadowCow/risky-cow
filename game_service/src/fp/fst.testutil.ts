import { FstFactory } from './fst'

export const STATE_IS_UNCHANGED = Symbol('STATE_IS_UNCHANGED')

export function fstTest<I, O, S>(
  fstFactory: FstFactory<I, O, S>,
  testCase: FstTestCase<I, O, S>,
): () => void {
  return () => {
    const fst = fstFactory(testCase.Given)

    const outputs = fst.onInput(testCase.When)
    const nextState = fst.getState()

    if (testCase.Then === STATE_IS_UNCHANGED) {
      expect(nextState).toEqual(testCase.Given)
    } else {
      expect(nextState).toEqual(testCase.Then)
    }

    expect(outputs).toEqual(testCase.And)
  }
}

export type FstTestCase<I, O, S> = {
  Given: S
  When: I
  Then: S | typeof STATE_IS_UNCHANGED
  And: Array<O>
}
