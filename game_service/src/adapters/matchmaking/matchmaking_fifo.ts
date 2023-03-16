import {
  findMatch,
  leaveMatchmaking,
  leftMatchmaking,
  matchMade,
  MatchmakingService,
  MatchmakingServiceInput,
  MatchmakingServiceOutput,
  playerInMatchmakingQueue,
} from '../../domain/ports/matchmaking_service'
import { eventProcessorFromHandler } from '../../event/event_processor'
import { assertNever } from '../../fp/pattern_matching'

export function createMatchmakingFifo(): MatchmakingService {
  let state = initState()

  return eventProcessorFromHandler<
    MatchmakingServiceInput,
    MatchmakingServiceOutput
  >((i) => {
    switch (i.kind) {
      case findMatch.kind:
        if (state.queuedPlayerId !== undefined) {
          return [
            matchMade({
              player1Id: state.queuedPlayerId,
              player2Id: i.value.playerId,
            }),
          ]
        } else {
          return [playerInMatchmakingQueue({ playerId: i.value.playerId })]
        }
      case leaveMatchmaking.kind:
        if (state.queuedPlayerId === i.value.playerId) {
          state = initState()
          return [leftMatchmaking({ playerId: i.value.playerId })]
        } else {
          return []
        }
      default:
        assertNever(i)
    }
  })
}

type State = {
  queuedPlayerId: string | undefined
}
function initState(): State {
  return {
    queuedPlayerId: undefined,
  }
}
