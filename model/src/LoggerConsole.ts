import { Logger } from "./Logger";

export function createLoggerConsole(): Logger {
  return {
    log(msg) {
      console.log(msg);
    },
  };
}
