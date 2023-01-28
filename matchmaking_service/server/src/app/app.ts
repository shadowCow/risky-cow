import { EventStore } from "./ports/EventStore";
import { Logger } from "./ports/Logger";
import { MatchmakingAlgorithm } from "./ports/MatchmakingAlgorithm";
import {
  createMatchmakingService,
  MatchmakingService,
} from "./services/MatchmakingService";
import { PlayerRepo } from "./ports/PlayerRepo";
import { Event as PlayerQueueEvent } from "./model/PlayerQueue";

export async function createApp(
  logger: Logger,
  matchmaker: MatchmakingAlgorithm,
  playerRepo: PlayerRepo,
  playerQueueEventStore: EventStore<PlayerQueueEvent>,
  eventPublisher: (e: PlayerQueueEvent) => void
): Promise<MatchmakingService> {
  const persistedEvents = await loadPersistedEvents(
    playerQueueEventStore,
    logger
  );

  const matchmakingService = createMatchmakingService(
    playerRepo,
    persistedEvents,
    matchmaker,
    eventPublisher
  );

  return matchmakingService;
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
