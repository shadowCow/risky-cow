import {
  authenticateUser,
  authenticateUserSuccess,
  AuthService,
} from '../../domain/ports/auth_service'
import { eventProcessorFromHandler } from '../../event/event_processor'

export function createAuthDummy(playerId: string): AuthService {
  return eventProcessorFromHandler((i) => {
    switch (i.kind) {
      case authenticateUser.kind:
        return [authenticateUserSuccess({ playerId })]
    }
  })
}
