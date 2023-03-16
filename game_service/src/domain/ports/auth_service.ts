import { EventProcessor } from '../../event/event_processor'
import { adt } from '../../fp/adt'

export type AuthService = EventProcessor<AuthServiceInput, AuthServiceOutput>

export type AuthServiceInput = AuthenticateUser

export const authenticateUser = adt<'AuthenticateUser', { token: string }>(
  'AuthenticateUser',
)
export type AuthenticateUser = ReturnType<typeof authenticateUser>

export type AuthServiceOutput =
  | AuthenticateUserSuccess
  | AuthenticateUserFailure

export const authenticateUserSuccess = adt<
  'AuthenticateUserSuccess',
  { playerId: string }
>('AuthenticateUserSuccess')
export type AuthenticateUserSuccess = ReturnType<typeof authenticateUserSuccess>

export const authenticateUserFailure = adt<
  'AuthenticateUserFailure',
  { reason: string }
>('AuthenticateUserFailure')
export type AuthenticateUserFailure = ReturnType<typeof authenticateUserFailure>
