export interface Log {
    args: Arg[]
    level: string
    method: string
    source: Source
    stackTrace: StackTrace
    text: string
    timestamp: number
    type: string
}

export interface Arg {
    type: string
    value: Value[] | string
}

export interface Value {
    type: string
    value: [string, Value][] | any
}

export interface Value2 {
    type: string
    value: any
}

export interface Source {
    context: string
    realm: string
}

export interface StackTrace {
    callFrames: CallFrame[]
}

export interface CallFrame {
    columnNumber: number
    functionName: string
    lineNumber: number
    url: string
}