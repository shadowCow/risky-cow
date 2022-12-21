import { GameRoomFst } from "../../../model/src/GameRoom";
import { ActionExecutor } from "../../ActionExecutor";
import { Action } from "../Actions";

export function createAppActionExecutor(
  gameRoomFst: GameRoomFst
): ActionExecutor<Action> {
  return (action) => {
    switch (action.kind) {
      case "JoinRandomGame":
        gameRoomFst.onInput({
          kind: "QueueForGame",
          playerId: action.playerId,
        });
        break;
      default:
      // const _exhaust: never = action;
    }
  };
}
