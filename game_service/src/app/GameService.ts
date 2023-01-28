export type GameService = {
  onCommand: (command: Command) => void
}

export type Command = StartGameRequest | ConcedeGameRequest

export type StartGameRequest = {
  kind: 'StartGameRequest'
  player1Id: string
  player2Id: string
}

export type ConcedeGameRequest = {
  kind: 'ConcedeGameRequest'
  gameId: string
  playerId: string
}

export function createGameService(): GameService {
  return {
    onCommand(command) {
      switch (command.kind) {
        case 'StartGameRequest':
          break
        case 'ConcedeGameRequest':
          break
        default:
          const _exhaust: never = command
          return _exhaust
      }
    },
  }
}
