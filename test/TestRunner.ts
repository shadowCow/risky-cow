import { CommandExecutor } from "./CommandExecutor";
import {
  createFailResult,
  createPassResult,
  TestReporter,
} from "./reporter/Reporter";
import { UseCase } from "./use_cases/UseCase";
import { ValidationExecutor } from "./ValidationExecutor";

export type TestRunner<Event, Command, Validation> = {
  run(useCases: Array<UseCase<Event, Command, Validation>>): void;
};

export function createTestRunner<Event, Command, Validation>(
  reporter: TestReporter,
  appFactory: (eventLog: Array<Event>) => (command: Command) => void,
  userCommandExecutor: CommandExecutor<Command>,
  stateValidationExecutor: ValidationExecutor<Validation>
): TestRunner<Event, Command, Validation> {
  return {
    run(useCases: Array<UseCase<Event, Command, Validation>>) {
      useCases.forEach((useCase) => {
        try {
          const app = appFactory(useCase.Given);

          userCommandExecutor(useCase.When);

          useCase.Then.forEach((validation) =>
            stateValidationExecutor(validation)
          );

          reporter.report(createPassResult(useCase.description));
        } catch (ex) {
          reporter.report(createFailResult(useCase.description, ex));
        }
      });
    },
  };
}
