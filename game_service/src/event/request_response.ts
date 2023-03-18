export type RequestResponse<I, O> = {
  ask: (i: I) => Promise<O>
}
