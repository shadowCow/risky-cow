import { fstTest, FstTestCase, STATE_IS_UNCHANGED } from '../../fp/fst.testutil'
import {
  findMatch,
  leaveMatchmaking,
  leftMatchmaking,
  matchMade,
  MatchmakerInput,
  MatchmakerOutput,
  playerInMatchmakingQueue,
} from '../messages'
import {
  createMatchmakerFifoFst,
  initState,
  MatchmakerFifoState,
  playerQueuedState,
} from './matchmaker_fifo'

describe('matchmaker fifo fst', () => {
  const matchmakerTest = (
    testCase: FstTestCase<
      MatchmakerInput,
      MatchmakerOutput,
      MatchmakerFifoState
    >,
  ) => fstTest(createMatchmakerFifoFst, testCase)
  const player1Id = 'p1'
  const player2Id = 'p2'

  describe('find match', () => {
    test(
      'no player in queue',
      matchmakerTest({
        Given: initState(),
        When: findMatch({ playerId: player1Id }),
        Then: playerQueuedState(player1Id),
        And: [playerInMatchmakingQueue({ playerId: player1Id })],
      }),
    )

    test(
      'another player is in the queue',
      matchmakerTest({
        Given: playerQueuedState(player1Id),
        When: findMatch({ playerId: player2Id }),
        Then: initState(),
        And: [matchMade({ player1Id, player2Id })],
      }),
    )

    test(
      'you are already in the queue',
      matchmakerTest({
        Given: playerQueuedState(player1Id),
        When: findMatch({ playerId: player1Id }),
        Then: STATE_IS_UNCHANGED,
        And: [playerInMatchmakingQueue({ playerId: player1Id })],
      }),
    )
  })

  describe('leave matchmaking', () => {
    test(
      'no player in the queue',
      matchmakerTest({
        Given: initState(),
        When: leaveMatchmaking({ playerId: player1Id }),
        Then: STATE_IS_UNCHANGED,
        And: [leftMatchmaking({ playerId: player1Id })],
      }),
    )

    test(
      'another player in the queue',
      matchmakerTest({
        Given: playerQueuedState(player2Id),
        When: leaveMatchmaking({ playerId: player1Id }),
        Then: STATE_IS_UNCHANGED,
        And: [leftMatchmaking({ playerId: player1Id })],
      }),
    )

    test(
      'you are in the queue',
      matchmakerTest({
        Given: playerQueuedState(player1Id),
        When: leaveMatchmaking({ playerId: player1Id }),
        Then: initState(),
        And: [leftMatchmaking({ playerId: player1Id })],
      }),
    )
  })
})
