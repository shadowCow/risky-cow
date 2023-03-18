import { RequestResponseFactory } from './request_response'

export function requestResponseTest<I, O>(
  testCase: RequestResponseTestCase<I, O>,
): () => Promise<void> {
  return async () => {
    const service = await testCase.Given()

    const o = await service.ask(testCase.When)

    expect(o).toEqual(testCase.Then)
  }
}

export type RequestResponseTestCase<I, O> = {
  Given: RequestResponseFactory<I, O>
  When: I
  Then: O
}

export function resolveWith<T>(t: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(t), 0)
  })
}

export function rejectWith<T>(msg: string): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(msg), 0)
  })
}
