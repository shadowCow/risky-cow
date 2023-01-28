import { Logger } from "../app/ports/Logger";

export function createLoggerConsole(): Logger {
  return {
    log(msg) {
      console.log(msg);
    },
  };
}
