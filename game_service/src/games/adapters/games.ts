import { Fst, fstFactoryFromTransitionFn } from '../../fp/fst'
import { GamesInput, GamesOutput } from '../messages'

export const createGamesFst = fstFactoryFromTransitionFn(
  transition,
  initState(),
)

export type GamesState = {}
export function initState(): GamesState {
  return {}
}

function transition(
  state: GamesState,
  input: GamesInput,
): [GamesState, Array<GamesOutput>] {
  return [state, []]
}
