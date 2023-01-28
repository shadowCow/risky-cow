import { IdGenerator } from '../domain/ports/IdGenerator'

export function createIdGeneratorAutoIncrement(): IdGenerator {
  let nextId = 0

  return {
    uuid() {
      const id = `${nextId}`
      nextId++

      return id
    },
  }
}
