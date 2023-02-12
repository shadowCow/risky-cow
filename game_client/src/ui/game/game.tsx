import { PlayerInGame } from '../../services/game_service/game_service'

export function Game(props: { playerInGameState: PlayerInGame }): JSX.Element {
  return (
    <div>
      <h1>This is the game</h1>
    </div>
  )
}
