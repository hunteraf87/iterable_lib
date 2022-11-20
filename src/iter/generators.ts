import {cast, isIterable} from "./helpers";
import type {FlatIterable} from "./interface";

export function *naturalNumbers(max: number): Generator<number> {
    let i = 1;
    while (i <= max) {
        yield i;
        i++;
    }
}

export function *filter<T>(
    iterable: Iterable<T>,
    callback: (value: T, index: number, iterable: Iterable<T>) => unknown
): Generator<T> {
    let idx = 0;
    for (const item of iterable) {
        if (callback(item, idx, iterable)) {
            yield item;
            idx++;
        }
    }
}

export async function *asyncFilter<T>(
    iterable: AsyncIterable<T>,
    callback: (value: T, index: number, iterable: AsyncIterable<T>) => unknown
): AsyncGenerator<T> {
    let idx = 0;
    for await (const item of iterable) {
        if (callback(item, idx, iterable)) {
            yield item;
            idx++;
        }
    }
}

export function *limit<T>(
    iterable: Iterable<T>,
    count: number
): Generator<T> {
    let i = 0;
    const iter = iterable[Symbol.iterator]();
    while (i++ < count) {
        const next = iter.next();
        if (!next.done) {
            yield next.value;
        } else {
            break;
        }
    }
}

export async function *asyncLimit<T>(
    iterable: AsyncIterable<T>,
    count: number
): AsyncGenerator<T> {
    let i = 0;
    for await (const item of iterable) {
        if (i < count) {
            yield item;
            i++;
        } else {
            break;
        }
    }
}

export function *map<U, T>(
    iterable: Iterable<T>,
    callback: (value: T, index: number, iterable: Iterable<T>) => U
): Generator<U> {
    let idx = 0;
    for (const item of iterable) {
        yield callback(item, idx, iterable);
        idx++;
    }
}

export async function *asyncMap<U, T>(
    iterable: AsyncIterable<T>,
    callback: (value: T, index: number, iterable: AsyncIterable<T>) => U
): AsyncGenerator<U> {
    let idx = 0;
    for await (const item of iterable) {
        yield callback(item, idx, iterable);
        idx++;
    }
}

export function *from<T>(
    iterable: Iterable<T>,
    from = 0,
    to?: number
): Generator<T> {
    let i = 0;
    for (const item of iterable) {
        if (to !== undefined && i > to) {
            break;
        }
        if (i++ < from) {
            continue;
        }
        yield item;
    }
}

export async function *asyncFrom<T>(
    iterable: AsyncIterable<T>,
    from = 0,
    to?: number
): AsyncGenerator<T> {
    let i = 0;
    for await (const item of iterable) {
        if (to !== undefined && i > to) {
            break;
        }
        if (i++ < from) {
            continue;
        }
        yield item;
    }
}

export function *flat<T extends Iterable<any>, Depth extends number = 1>(
    iterable: T,
    depth?: Depth
): Generator<FlatIterable<T, Depth>> {
    const d = depth !== undefined ? depth : 1;
    for (const item of iterable) {
        if (isIterable(item) && d > 0) {
            yield* flat(cast(item), d - 1);
            continue;
        }
        yield item;
    }
}

export async function *asyncFlat<T extends AsyncIterable<any>, Depth extends number = 1>(
    iterable: T,
    depth?: Depth
): AsyncGenerator<FlatIterable<T, Depth>> {
    const d = depth !== undefined ? depth : 1;
    for await (const item of iterable) {
        if (isIterable(item) && d > 0) {
            yield* cast(flat(item, d - 1));
            continue;
        }
        yield item;
    }
}

export function *flatMap<T, U extends Iterable<any>>(
    iterable: Iterable<T>,
    callback: (value: T, index: number, iterable: Iterable<T>) => U
): Generator<U> {
    let idx = 0;
    for (const item of iterable) {
        const value = callback(item, idx, iterable);
        yield* flat(value, 0);
        idx++;
    }
}

export async function *asyncFlatMap<T, U extends Iterable<any>>(
    iterable: AsyncIterable<T>,
    callback: (value: T, index: number, iterable: AsyncIterable<T>) => U
): AsyncGenerator<U> {
    let idx = 0;
    for await (const item of iterable) {
        const value = callback(item, idx, iterable);
        yield* flat(value, 0);
        idx++;
    }
}
