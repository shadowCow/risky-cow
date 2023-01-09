import { UseCase } from "../use_cases/UseCase";
import { Action, joinRandomGame } from "./Actions";
import { Validation } from "./Validations";

export function createAppUseCases(): Array<UseCase<Action, Validation>> {
  return [
    {
      description: "Join an empty game queue",
      Given: emptyGameRoom(),
      When: joinRandomGame("p1"),
      Then: playerQueued("p1"),
    },
    {
      description: "Join a populated game queue",
      Given: playerQueuesUp("p1"),
      When: joinRandomGame("p2"),
      Then: gameStarted("p1", "p2"),
    },
  ];
}

function emptyGameRoom(): Array<Action> {
  return [];
}

function playerQueuesUp(playerId: string): Array<Action> {
  return [joinRandomGame(playerId)];
}

function playerQueued(id: string): Array<Validation> {
  return [{ kind: "PlayerIsInGameQueue", playerId: "p1" }];
}

function gameStarted(player1Id: string, player2Id: string): Array<Validation> {
  return [];
}

function gameRoomIsEmpty(): Array<Validation> {
  return [];
}
