import { createEventStoreInMemory } from "../../model/src/EventStoreInMemory";
import { createFifoMatchmaker } from "../../model/src/FifoMatchmaker";
import { createLoggerConsole } from "../../model/src/LoggerConsole";
import { Event as PlayerQueueEvent } from "../../model/src/PlayerQueue";
import { createPlayerRepoInMemory } from "../../model/src/PlayerRepoInMemory";
import { createApp } from "./app";

const logger = createLoggerConsole();
const matchmaker = createFifoMatchmaker();
const playerRepo = createPlayerRepoInMemory();
const playerQueueEventStore = createEventStoreInMemory<PlayerQueueEvent>();

async function start() {
  const app = await createApp(
    logger,
    matchmaker,
    playerRepo,
    playerQueueEventStore
  );
}

start()
  .then(() => {})
  .catch((err) => logger.log(`error starting app ${err}`));
