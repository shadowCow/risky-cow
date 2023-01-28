export type UseCase<Event, Command, Validation> = {
  description: string;
  /**
   * Event history that defines the system start state
   */
  Given: Array<Event>;
  /**
   * Ask the system to do something
   */
  When: Command;
  /**
   * Verify the result of the operation
   */
  Then: Array<Validation>;
};
