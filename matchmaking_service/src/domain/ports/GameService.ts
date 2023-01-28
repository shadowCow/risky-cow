import { MatchMade } from '../model/PlayerQueue'

export type GameService = {
  onMatchMade: (event: MatchMade) => void

  getGameIdByPlayerId: (playerId: string) => Promise<string | undefined>
}
