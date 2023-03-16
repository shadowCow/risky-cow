import {
  fetchPlayer,
  fetchPlayerSuccess,
  PlayerRepo,
} from '../../domain/ports/player_repo'
import { eventProcessorFromHandler } from '../../event/event_processor'

export function createPlayerRepoInMemory(): PlayerRepo {
  return eventProcessorFromHandler((i) => {
    switch (i.kind) {
      case fetchPlayer.kind:
        return [fetchPlayerSuccess({ player: { id: i.value.playerId } })]
    }
  })
}
