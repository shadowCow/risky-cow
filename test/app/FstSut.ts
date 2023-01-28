import { Fst } from '../../model/src/Fst'

export type FstSut<I, O> = Fst<I, O> & {
  getLastOutput: () => Readonly<Array<O>>
}

export function createFstSut<I, O>(fst: Fst<I, O>): FstSut<I, O> {
  let _lastOutput: Array<O> = []

  return {
    onInput(i) {
      _lastOutput = fst.onInput(i)

      return [..._lastOutput]
    },
    getLastOutput() {
      return _lastOutput
    },
  }
}
