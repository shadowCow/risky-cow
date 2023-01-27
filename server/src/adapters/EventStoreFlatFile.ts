import { EventStore } from "../../server/src/app/ports/EventStore";

export function createEventStoreFlatFile<E>(filePath: string): EventStore<E> {
  return {
    persist(e) {
      return Promise.reject("not implemented");
    },
    readAll() {
      return Promise.reject("not implemented");
    },
  };
}
