export type ValidationExecutor<Response> = (
  expected: Response,
  actual: Response,
) => void
