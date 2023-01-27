import { createEventStoreInMemory } from "./adapters/EventStoreInMemory";
import { createFifoMatchmaker } from "./adapters/FifoMatchmaker";
import { createLoggerConsole } from "./adapters/LoggerConsole";
import { Event as PlayerQueueEvent } from "./app/model/PlayerQueue";
import { createPlayerRepoInMemory } from "./adapters/PlayerRepoInMemory";
import { createApp } from "./app/app";

const logger = createLoggerConsole();
const matchmaker = createFifoMatchmaker();
const playerRepo = createPlayerRepoInMemory();
const playerQueueEventStore = createEventStoreInMemory<PlayerQueueEvent>();
const eventPublisher = (event: PlayerQueueEvent) => {};

async function start() {
  const app = await createApp(
    logger,
    matchmaker,
    playerRepo,
    playerQueueEventStore,
    eventPublisher
  );
}

start()
  .then(() => {})
  .catch((err) => logger.log(`error starting app ${err}`));
