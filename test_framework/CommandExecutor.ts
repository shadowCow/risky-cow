export type CommandExecutor<Request, Response> = (
  request: Request,
) => Promise<Response>
