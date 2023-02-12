import { PlayerInQueue } from '../../services/game_service/game_service'

export function Queued(props: {
  playerQueuedState: PlayerInQueue
}): JSX.Element {
  return (
    <div>
      <h1>In matchmaking queue...</h1>
    </div>
  )
}
