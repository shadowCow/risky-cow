import { TestReporter, TestResult } from './Reporter'

export function createConsoleReporter(): TestReporter {
    return {
        report(result) {
            console.log(formatResult(result))
        },
    }
}

function formatResult(result: TestResult): string {
    switch (result.kind) {
        case 'FailResult':
            return `${formatHeaderLine(result)}` + '\n    ' + `${result.error}`
        case 'PassResult':
            return `${formatHeaderLine(result)}`
        default:
            const exhaust: never = result
            return exhaust
    }
}

function formatHeaderLine(result: TestResult): string {
    return `[${statusText(result)}] ${result.description}`
}

function statusText(result: TestResult): string {
    switch (result.kind) {
        case 'FailResult':
            return 'FAIL'
        case 'PassResult':
            return 'PASS'
        default:
            const exhaust: never = result
            return exhaust
    }
}
