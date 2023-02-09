export type EntityStore<E> = {
  onEvent: (e: E) => void
}

export function createEntityStore<S, E>(
  apply: (s: S, e: E) => S,
  initialState: S,
): EntityStore<E> {
  let _state = initialState

  return {
    onEvent(e) {
      _state = apply(_state, e)
    },
  }
}

export function hydrate<S, E>(
  entityStore: EntityStore<E>,
  events: Array<E>,
): void {
  events.forEach((event) => entityStore.onEvent(event))
}
