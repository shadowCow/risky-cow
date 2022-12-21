import { createGameRoomFst } from "../model/src/GameRoom";
import { PlayerRepo } from "../model/src/PlayerRepo";
import { createPlayerRepoInMemory } from "../model/src/PlayerRepoInMemory";
import { createTestCases } from "./app/AppUseCases";
import { createFstSut } from "./app/FstSut";
import { createAppActionExecutor } from "./app/impl/AppActionExecutor";
import { createAppValidationExecutor } from "./app/impl/AppValidationExecutor";
import { createConsoleReporter } from "./reporter/ConsoleReporter";
import { createTestRunner } from "./TestRunner";
import { UseCase } from "./use_cases/UseCase";

const reporter = createConsoleReporter();

const playerRepo = createPlayerRepoInMemory();
const idGenerator = () => "1";
const fst = createGameRoomFst(idGenerator, playerRepo);
const fstSut = createFstSut(fst);

const testRunner = createTestRunner(
  reporter,
  createAppActionExecutor(fstSut),
  createAppValidationExecutor(fstSut)
);

testRunner.run(createTestCases());
