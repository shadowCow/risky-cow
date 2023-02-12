import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { createGameServiceApiMock } from './services/game_service/api/game_service_api_mock'
import { createGameService } from './services/game_service/game_service'

const playerId = 'the-player-1'
const gameService = createGameService(createGameServiceApiMock(), playerId)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App gameService={gameService} playerId={playerId} />
  </React.StrictMode>,
)
