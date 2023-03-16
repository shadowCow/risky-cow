export type EventProcessor<I, O> = {
  onInput: (i: I) => void
  listen: (listener: EventListener<O>) => void
}

export type EventListener<O> = (o: O) => void

export function eventProcessorFromHandler<I, O>(
  handler: (i: I) => Array<O>,
): EventProcessor<I, O> {
  let _listener: EventListener<O> | undefined

  return {
    onInput(i) {
      const os = handler(i)

      if (_listener !== undefined) {
        for (let i = 0; i < os.length; i++) {
          _listener(os[i])
        }
      }
    },
    listen(listener) {
      _listener = listener
    },
  }
}
