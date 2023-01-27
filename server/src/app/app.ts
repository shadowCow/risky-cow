import { EventStore, hydrate } from "./ports/EventStore";
import { Logger } from "./ports/Logger";
import { MatchmakingAlgorithm } from "./ports/MatchmakingAlgorithm";
import {
  createMatchmakingService,
  MatchmakingService,
} from "./services/MatchmakingService";
import { PlayerRepo } from "./ports/PlayerRepo";
import {
  createPlayerQueueState,
  Event as PlayerQueueEvent,
  apply as PlayerQueueApply,
} from "./model/PlayerQueue";

export type App = {
  matchmakingService: MatchmakingService;
};

export async function createApp(
  logger: Logger,
  matchmaker: MatchmakingAlgorithm,
  playerRepo: PlayerRepo,
  playerQueueEventStore: EventStore<PlayerQueueEvent>,
  eventPublisher: (e: PlayerQueueEvent) => void
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
    matchmaker,
    eventPublisher
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
