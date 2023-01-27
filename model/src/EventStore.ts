export type EventStore<E> = {
  persist: (e: E) => Promise<void>;
  readAll: () => Promise<Array<E>>;
};

export function hydrate<S, E>(
  state: S,
  apply: (s: S, e: E) => S,
  events: Array<E>
): S {
  return events.reduce<S>((acc, event) => apply(acc, event), state);
}
