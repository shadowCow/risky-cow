import { EventStore } from "../domain/ports/EventStore";

export function createEventStoreInMemory<E>(): EventStore<E> {
  const eventLog: Array<E> = [];

  return {
    persist(e) {
      eventLog.push(e);

      return Promise.resolve();
    },
    readAll() {
      return Promise.resolve([...eventLog]);
    },
  };
}
