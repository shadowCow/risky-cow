export type CommandExecutor<Request, Response> = (
  request: Request,
) => Promise<Response>

export type ServiceTestCase<Request, Response> = {
  Given: () => CommandExecutor<Request, Response>
  When: Request
  Then: Response
}

export async function serviceTest<Request, Response>(
  testCase: ServiceTestCase<Request, Response>,
): Promise<void> {
  const service = testCase.Given()

  const actualResponse = await service(testCase.When)

  expect(actualResponse).toEqual(testCase.Then)
}
