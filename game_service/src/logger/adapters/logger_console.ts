import { Logger } from '../logger'

export function createLoggerConsole(): Logger {
  return {
    error(msg) {
      console.error(msg)
    },
    warn(msg) {
      console.warn(msg)
    },
    info(msg) {
      console.info(msg)
    },
    debug(msg) {
      console.debug(msg)
    },
    trace(msg) {
      console.trace(msg)
    },
  }
}
