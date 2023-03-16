import { adt } from '../fp/adt'

export type GameService = {
  joinGame: (request: JoinGameRequest) => Promise<JoinGameResponse>
  playerStatus: (request: PlayerStatusRequest) => Promise<PlayerStatusResponse>
  leaveQueue: (request: LeaveQueueRequest) => Promise<LeaveQueueResponse>
  makeMove: (request: MakeMoveRequest) => Promise<MakeMoveResponse>
  concedeGame: (request: ConcedeGameRequest) => Promise<ConcedeGameResponse>
}

export function createGameService(): GameService {
  return {
    joinGame(request) {
      return Promise.resolve(
        joinGameResponse({ result: joinGameFailure({ reason: 'none' }) }),
      )
    },
    playerStatus(request) {
      throw new Error('not implemented')
    },
    leaveQueue(request) {
      throw new Error('not implemented')
    },
    makeMove(request) {
      throw new Error('not implemented')
    },
    concedeGame(request) {
      throw new Error('not implemented')
    },
  }
}

export type Request =
  | JoinGameRequest
  | PlayerStatusRequest
  | LeaveQueueRequest
  | MakeMoveRequest
  | ConcedeGameRequest

export const joinGameRequest = adt<'JoinGameRequest', { playerId: string }>(
  'JoinGameRequest',
)
export type JoinGameRequest = ReturnType<typeof joinGameRequest>

export const playerStatusRequest = adt<'PlayerStatusRequest', void>(
  'PlayerStatusRequest',
)
export type PlayerStatusRequest = ReturnType<typeof playerStatusRequest>

export const leaveQueueRequest = adt<'LeaveQueueRequest', void>(
  'LeaveQueueRequest',
)
export type LeaveQueueRequest = ReturnType<typeof leaveQueueRequest>

export const makeMoveRequest = adt<'MakeMoveRequest', void>('MakeMoveRequest')
export type MakeMoveRequest = ReturnType<typeof makeMoveRequest>

export const concedeGameRequest = adt<'ConcedeGameRequest', void>(
  'ConcedeGameRequest',
)
export type ConcedeGameRequest = ReturnType<typeof concedeGameRequest>

export type Response =
  | JoinGameResponse
  | PlayerStatusResponse
  | LeaveQueueResponse
  | MakeMoveResponse
  | ConcedeGameResponse

export const joinGameResponse = adt<
  'JoinGameResponse',
  { result: JoinGameResult }
>('JoinGameResponse')
export type JoinGameResponse = ReturnType<typeof joinGameResponse>

export type JoinGameResult = PlayerInGame | PlayerInQueue | JoinGameFailure

export const joinGameFailure = adt<'JoinGameFailure', { reason: string }>(
  'JoinGameFailure',
)
export type JoinGameFailure = ReturnType<typeof joinGameFailure>

export const playerStatusResponse = adt<'PlayerStatusResponse', void>(
  'PlayerStatusResponse',
)
export type PlayerStatusResponse = ReturnType<typeof playerStatusResponse>

export const leaveQueueResponse = adt<'LeaveQueueResponse', void>(
  'LeaveQueueResponse',
)
export type LeaveQueueResponse = ReturnType<typeof leaveQueueResponse>

export const makeMoveResponse = adt<'MakeMoveResponse', void>(
  'MakeMoveResponse',
)
export type MakeMoveResponse = ReturnType<typeof makeMoveResponse>

export const concedeGameResponse = adt<'ConcedeGameResponse', void>(
  'ConcedeGameResponse',
)
export type ConcedeGameResponse = ReturnType<typeof concedeGameResponse>

export type PlayerStatus = ActivePlayerStatus | PlayerIdle
export type ActivePlayerStatus = PlayerInQueue | PlayerInGame

export const playerInQueue = adt<'PlayerInQueue', { playerId: string }>(
  'PlayerInQueue',
)
export type PlayerInQueue = ReturnType<typeof playerInQueue>

export const playerInGame = adt<
  'PlayerInGame',
  { playerId: string; gameId: string }
>('PlayerInGame')
export type PlayerInGame = ReturnType<typeof playerInGame>

export const playerIdle = adt<'PlayerIdle', { playerId: string }>('PlayerIdle')
export type PlayerIdle = ReturnType<typeof playerIdle>
