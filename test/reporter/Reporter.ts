export type TestReporter = {
    report(result: TestResult): void
}

export type TestResult = PassResult | FailResult

export type PassResult = {
    kind: 'PassResult'
    description: string
}
export function createPassResult(description: string): PassResult {
    return {
        kind: 'PassResult',
        description,
    }
}

export type FailResult = {
    kind: 'FailResult'
    description: string
    error: any
}
export function createFailResult(description: string, error: any): FailResult {
    return {
        kind: 'FailResult',
        description,
        error,
    }
}
