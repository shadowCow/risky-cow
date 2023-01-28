export type CommandExecutor<Command> = (command: Command) => Promise<void>
