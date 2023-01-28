import { createGameRoomFst } from "../../model/src/GameRoom";
import { createPlayerRepoInMemory } from "../../matchmaking_service/server/src/adapters/PlayerRepoInMemory";
import { createConsoleReporter } from "../reporter/ConsoleReporter";
import { createFstTestRunner } from "./FstTest";

const reporter = createConsoleReporter();

const playerRepo = createPlayerRepoInMemory();
const idGenerator = () => "1";
const fstFactory = () => createGameRoomFst(idGenerator, playerRepo);

const testRunner = createFstTestRunner(reporter, fstFactory);

testRunner.run([
  {
    description: "queue up for game",
    Given: [],
    When: {
      kind: "QueueForGame",
      playerId: "p1",
    },
    Then: [
      {
        kind: "JoinedQueue",
        playerId: "p1",
      },
    ],
  },
]);
