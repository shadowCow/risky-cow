import { UseCase } from "../use_cases/UseCase";
import { Action } from "./Actions";
import { Validation } from "./Validations";

export function createTestCases(): Array<UseCase<Action, Validation>> {
  return [
    {
      description: "Join the game queue",
      Given: () => {},
      When: { kind: "JoinRandomGame", playerId: "p1" },
      Then: [{ kind: "PlayerIsInGameQueue", playerId: "p1" }],
    },
  ];
}
