import { Fst, fstFromTransitionFn } from '../../fp/fst'
import { assertNever } from '../../fp/pattern_matching'
import {
  findMatch,
  leaveMatchmaking,
  leftMatchmaking,
  matchMade,
  MatchmakerInput,
  MatchmakerOutput,
  playerInMatchmakingQueue,
} from '../messages'

export function createMatchmakerFifoFst(
  initialState?: MatchmakerFifoState,
): Fst<MatchmakerInput, MatchmakerOutput, MatchmakerFifoState> {
  const state = initialState === undefined ? initState() : initialState

  return fstFromTransitionFn(transition, state)
}

export type MatchmakerFifoState = {
  queuedPlayerId: string | undefined
}
export function initState(): MatchmakerFifoState {
  return {
    queuedPlayerId: undefined,
  }
}
export function playerQueuedState(queuedPlayerId: string): MatchmakerFifoState {
  return {
    queuedPlayerId,
  }
}

function transition(
  state: MatchmakerFifoState,
  input: MatchmakerInput,
): [MatchmakerFifoState, Array<MatchmakerOutput>] {
  switch (input.kind) {
    case findMatch.kind:
      if (state.queuedPlayerId === undefined) {
        return [
          playerQueuedState(input.value.playerId),
          [playerInMatchmakingQueue({ playerId: input.value.playerId })],
        ]
      } else if (state.queuedPlayerId === input.value.playerId) {
        return [
          state,
          [playerInMatchmakingQueue({ playerId: input.value.playerId })],
        ]
      } else {
        return [
          initState(),
          [
            matchMade({
              player1Id: state.queuedPlayerId,
              player2Id: input.value.playerId,
            }),
          ],
        ]
      }
    case leaveMatchmaking.kind:
      if (state.queuedPlayerId === input.value.playerId) {
        return [
          initState(),
          [leftMatchmaking({ playerId: input.value.playerId })],
        ]
      } else {
        return [state, [leftMatchmaking({ playerId: input.value.playerId })]]
      }
    default:
      assertNever(input)
  }
}
