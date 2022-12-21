export type UseCase<Action, Validation> = {
  description: string;
  Given(): void;
  When: Action;
  Then: Array<Validation>;
};
