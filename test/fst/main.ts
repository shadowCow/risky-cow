import { createGameRoomFst } from "../../model/src/GameRoom";
import { createPlayerRepoInMemory } from "../../model/src/PlayerRepoInMemory";
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
