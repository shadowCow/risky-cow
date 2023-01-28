import { GameRoomFst } from '../../../model/src/GameRoom'
import { CommandExecutor } from '../../CommandExecutor'
import { Action } from '../Actions'

export function createAppActionExecutor(
  gameRoomFst: GameRoomFst,
): CommandExecutor<Action> {
  return (action) => {
    switch (action.kind) {
      case 'JoinRandomGame':
        gameRoomFst.onInput({
          kind: 'QueueForGame',
          playerId: action.playerId,
        })
        break
      default:
      // const _exhaust: never = action;
    }
  }
}
