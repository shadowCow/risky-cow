export type Game<S, M> = {
  isValidMove: (m: M) => boolean
  initState: () => S
  onMove: (s: S, m: M) => S
}
