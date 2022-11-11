
export function cast<T>(value: any): T {
    return value;
}

export function isIterable<T>(value: any): value is Iterable<T> {
    return (value as Iterable<T>)[Symbol.iterator] !== undefined;
}

export function isAsyncIterable<T>(value: any): value is AsyncIterable<T> {
    return (value as AsyncIterable<T>)[Symbol.asyncIterator] !== undefined;
}

export async function asyncToArray<T>(data: AsyncIterable<T>): Promise<T[]> {
    const result = [];
    for await (const el of data) {
        result.push(el);
    }
    return result;
}