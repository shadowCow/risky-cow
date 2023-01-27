import { EventStore, hydrate } from "../../model/src/EventStore";
import { Logger } from "../../model/src/Logger";
import { MatchmakingAlgorithm } from "../../model/src/MatchmakingAlgorithm";
import {
  createMatchmakingService,
  MatchmakingService,
} from "../../model/src/MatchmakingService";
import { PlayerRepo } from "../../model/src/PlayerRepo";
import {
  createPlayerQueueState,
  Event as PlayerQueueEvent,
  apply as PlayerQueueApply,
} from "../../model/src/PlayerQueue";

export type App = {
  matchmakingService: MatchmakingService;
};

export async function createApp(
  logger: Logger,
  matchmaker: MatchmakingAlgorithm,
  playerRepo: PlayerRepo,
  playerQueueEventStore: EventStore<PlayerQueueEvent>
): Promise<App> {
  const defaultPlayerQueue = createPlayerQueueState();

  const persistedEvents = await loadPersistedEvents(
    playerQueueEventStore,
    logger
  );

  const playerQueue = hydrate(
    defaultPlayerQueue,
    PlayerQueueApply,
    persistedEvents
  );

  const matchmakingService = createMatchmakingService(
    playerRepo,
    playerQueue,
    matchmaker
  );

  return {
    matchmakingService,
  };
}

async function loadPersistedEvents(
  playerQueueEventStore: EventStore<PlayerQueueEvent>,
  logger: Logger
): Promise<Array<PlayerQueueEvent>> {
  let events: Array<PlayerQueueEvent> = [];
  try {
    events = await playerQueueEventStore.readAll();
  } catch (err) {
    logger.log(err);
  }

  return events;
}
