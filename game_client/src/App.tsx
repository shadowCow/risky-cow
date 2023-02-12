import { useEffect, useState } from 'react'
import './App.css'
import {
  GameService,
  GameServiceState,
} from './services/game_service/game_service'
import { Game } from './ui/game/game'
import { Home } from './ui/home/home'
import { Queued } from './ui/queued/queued'

export function App(props: {
  playerId: string
  gameService: GameService
}): JSX.Element {
  const [gameServiceState, setGameServiceState] = useState<
    GameServiceState | undefined
  >()

  useEffect(() => {
    return props.gameService.subscribe((state) => {
      setGameServiceState(state)
    })
  }, [])

  if (gameServiceState === undefined) {
    return <h1>Loading...</h1>
  } else {
    switch (gameServiceState.kind) {
      case 'PlayerIdle':
        return (
          <Home
            playerIdleState={gameServiceState}
            gameServiceDispatch={props.gameService.dispatch}
          />
        )
      case 'PlayerInQueue':
        return <Queued playerQueuedState={gameServiceState} />
      case 'PlayerInGame':
        return <Game playerInGameState={gameServiceState} />
      default:
        const _exhaust: never = gameServiceState
        return _exhaust
    }
  }
}
