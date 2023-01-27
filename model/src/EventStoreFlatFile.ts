import { EventStore } from "./EventStore";

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
