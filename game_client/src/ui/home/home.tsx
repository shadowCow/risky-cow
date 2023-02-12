import {
  GameServiceCommand,
  joinRandomGame,
  PlayerIdle,
} from '../../services/game_service/game_service'

export function Home(props: {
  playerIdleState: PlayerIdle
  gameServiceDispatch: (command: GameServiceCommand) => void
}): JSX.Element {
  const handleJoinGame = () => {
    props.gameServiceDispatch(joinRandomGame(props.playerIdleState.playerId))
  }

  return (
    <div>
      <h1>Welcome</h1>
      <h3>You have no active games</h3>
      <button onClick={handleJoinGame}>Join Game</button>
    </div>
  )
}
