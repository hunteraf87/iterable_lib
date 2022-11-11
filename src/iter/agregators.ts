
export function sum<T>(iterable: Iterable<T>): number {
    let result = 0;
    for (const item of iterable) {
        if (typeof item !== 'number') {
            throw new Error('Invalid data. Sum cannot be calculated.')
        }
        result += item;
    }
    return result;
}

export async function asyncSum<T>(iterable: AsyncIterable<T>): Promise<number> {
    let result = 0;
    for await (const item of iterable) {
        if (typeof item !== 'number') {
            return Promise.reject('Invalid data. Sum cannot be calculated.')
        }
        result += item;
    }
    return result;
}

export function avg<T>(iterable: Iterable<T>): number {
    let result = 0,
        count = 0;
    for (const item of iterable) {
        if (typeof item !== 'number') {
            throw new Error('Invalid data. Avg cannot be calculated.')
        }
        result += item;
        count++;
    }
    return result / count;
}

export async function asyncAvg<T>(iterable: AsyncIterable<T>): Promise<number> {
    let result = 0,
        count = 0;
    for await (const item of iterable) {
        if (typeof item !== 'number') {
            return Promise.reject('Invalid data. Avg cannot be calculated.')
        }
        result += item;
        count++;
    }
    return result / count;
}

export function min<T>(iterable: Iterable<T>): number {
    let min = Infinity;
    for (const item of iterable) {
        if (typeof item !== 'number') {
            throw new Error('Invalid data. Min cannot be calculated.')
        }
        min = item < min ? item : min;
    }
    return min;
}

export async function asyncMin<T>(iterable: AsyncIterable<T>): Promise<number> {
    let min = Infinity;
    for await (const item of iterable) {
        if (typeof item !== 'number') {
            return Promise.reject('Invalid data. Min cannot be calculated.')
        }
        min = item < min ? item : min;
    }
    return min;
}

export function max<T>(iterable: Iterable<T>): number {
    let max = -Infinity;
    for (const item of iterable) {
        if (typeof item !== 'number') {
            throw new Error('Invalid data. Max cannot be calculated.')
        }
        max = item > max ? item : max;
    }
    return max;
}

export async function asyncMax<T>(iterable: AsyncIterable<T>): Promise<number> {
    let max = -Infinity;
    for await (const item of iterable) {
        if (typeof item !== 'number') {
            return Promise.reject('Invalid data. Max cannot be calculated.')
        }
        max = item > max ? item : max;
    }
    return max;
}