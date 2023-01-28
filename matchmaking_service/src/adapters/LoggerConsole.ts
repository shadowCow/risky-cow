import { Logger } from "../domain/ports/Logger";

export function createLoggerConsole(): Logger {
  return {
    log(msg) {
      console.log(msg);
    },
  };
}
