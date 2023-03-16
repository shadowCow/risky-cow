export type Entity<State, Event> = {
  getState: () => State
  onEvent: (e: Event) => void
}

export function entity<S, E>(
  transition: (s: S, e: E) => S,
  initialState: S,
): Entity<S, E> {
  let state = initialState

  return {
    getState() {
      return state
    },
    onEvent(e) {
      state = transition(state, e)
    },
  }
}
