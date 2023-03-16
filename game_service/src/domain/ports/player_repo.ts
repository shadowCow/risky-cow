import { EventProcessor } from '../../event/event_processor'
import { adt } from '../../fp/adt'

export type PlayerRepo = EventProcessor<PlayerRepoInput, PlayerRepoOutput>

export type PlayerRepoInput = FetchPlayer

export const fetchPlayer = adt<'FetchPlayer', { playerId: string }>(
  'FetchPlayer',
)
export type FetchPlayer = ReturnType<typeof fetchPlayer>

export type PlayerRepoOutput = FetchPlayerSuccess | FetchPlayerFailure

export const fetchPlayerSuccess = adt<'FetchPlayerSuccess', { player: Player }>(
  'FetchPlayerSuccess',
)
export type FetchPlayerSuccess = ReturnType<typeof fetchPlayerSuccess>

export const fetchPlayerFailure = adt<'FetchPlayerFailure', { reason: string }>(
  'FetchPlayerFailure',
)
export type FetchPlayerFailure = ReturnType<typeof fetchPlayerFailure>

export type Player = {
  id: string
}
