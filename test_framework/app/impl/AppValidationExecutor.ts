import {
  GameRoomFst,
  GameRoomInput,
  GameRoomOutput,
} from '../../../model/src/GameRoom'
import { ValidationExecutor } from '../../ValidationExecutor'
import { FstSut } from '../FstSut'
import { Validation } from '../Validations'

export function createAppValidationExecutor(
  fstSut: FstSut<GameRoomInput, GameRoomOutput>,
): ValidationExecutor<Validation> {
  return (validation) => {
    switch (validation.kind) {
      case 'PlayerIsInGameQueue':
        fstSut
          .getLastOutput()
          .find(
            (o) =>
              o.kind === 'JoinedQueue' && o.playerId === validation.playerId,
          )
        break
      default:
      //const _exhaust: never = validation;
    }
  }
}
