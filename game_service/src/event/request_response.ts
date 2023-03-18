export type RequestResponse<I, O> = {
  ask: (i: I) => Promise<O>
}

export type RequestResponseFactory<I, O> = () => Promise<RequestResponse<I, O>>
