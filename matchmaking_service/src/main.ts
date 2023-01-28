import { createEventStoreInMemory } from "./adapters/EventStoreInMemory";
import { createFifoMatchmaker } from "./adapters/FifoMatchmaker";
import { createLoggerConsole } from "./adapters/LoggerConsole";
import { Event as PlayerQueueEvent } from "./domain/model/PlayerQueue";
import { createPlayerRepoInMemory } from "./adapters/PlayerRepoInMemory";
import { createMatchmakingService } from "./domain/MatchmakingService";
import { EventStore } from "./domain/ports/EventStore";
import { Logger } from "./domain/ports/Logger";

const logger = createLoggerConsole();
const matchmaker = createFifoMatchmaker();
const playerRepo = createPlayerRepoInMemory();
const playerQueueEventStore = createEventStoreInMemory<PlayerQueueEvent>();
const eventPublisher = (event: PlayerQueueEvent) => {};

async function start() {
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

start()
  .then(() => {})
  .catch((err) => logger.log(`error starting app ${err}`));
