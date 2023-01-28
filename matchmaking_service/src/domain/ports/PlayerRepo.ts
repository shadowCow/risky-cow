import { Player } from '../model/Player'

export type PlayerRepo = {
  getPlayerById: (id: string) => Promise<Player | undefined>
}
