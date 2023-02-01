import { CommandExecutor } from '../CommandExecutor'
import { ValidationExecutor } from '../ValidationExecutor'

export type UseCase<Request, Response> = {
  description: string
  /**
   * Event history that defines the system start state
   */
  Given: () => {
    commandExecutor: CommandExecutor<Request, Response>
  }
  /**
   * Ask the system to do something
   */
  When: Request
  /**
   * Verify the response of the operation
   */
  Then: Response
}
