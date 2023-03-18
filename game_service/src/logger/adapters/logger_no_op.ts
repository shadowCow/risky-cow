import { Logger } from '../logger'

export function createLoggerNoOp(): Logger {
  return {
    error(msg) {},
    warn(msg) {},
    info(msg) {},
    debug(msg) {},
    trace(msg) {},
  }
}
