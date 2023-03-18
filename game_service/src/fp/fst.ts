export type Fst<I, O, S> = {
  onInput: (i: I) => Array<O>
  getState: () => S
}

export type FstFactory<I, O, S> = (state?: S) => Fst<I, O, S>
export function fstFactoryFromTransitionFn<I, O, S>(
  transitionFn: FstTransitionFn<I, O, S>,
  initialState: S,
): FstFactory<I, O, S> {
  return (state) => {
    const startState = state === undefined ? initialState : state

    return fstFromTransitionFn(transitionFn, startState)
  }
}

export type FstTransitionFn<I, O, S> = (s: S, i: I) => [S, Array<O>]

export function fstFromTransitionFn<I, O, S>(
  transition: (s: S, i: I) => [S, Array<O>],
  initialState: S,
): Fst<I, O, S> {
  let _state: S = initialState

  return {
    onInput(i) {
      const [nextState, outputs] = transition(_state, i)
      _state = nextState

      return outputs
    },
    getState() {
      return _state
    },
  }
}
