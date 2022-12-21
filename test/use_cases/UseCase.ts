export type UseCase<Action, Validation> = {
  description: string;
  Given: Array<Action>;
  When: Action;
  Then: Array<Validation>;
};
