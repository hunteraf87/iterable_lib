
export type InputIterable<T> = Iterable<T> | AsyncIterable<T>;

export type AggregationValue = number | Promise<number>;

export type Collectable<T> = { push(value: T): void } | { add(value: T): void }

export type FlatIterable<T, Depth extends number> = {
    "done": T,
    "recur": T extends Iterable<infer InnerT>
        ? FlatIterable<InnerT, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
        : T
}[Depth extends -1 ? "done" : "recur"];

export interface RawData<T> extends Iterable<T>, AsyncIterable<T> {
    reverse?: () => IterableIterator<T>
}

export interface DataProvider<T> extends Iterable<T>, AsyncIterable<T> {
    isIterable(): boolean;
    values(): IterableIterator<T>;
    asyncValues(): AsyncIterableIterator<T>;
    reverse(): IterableIterator<T>;
}

export interface Iter<T> extends Iterable<T>, AsyncIterable<T> {

    map<U>(
        callback: (value: T, index: number, iterable: InputIterable<T>) => U
    ): Iter<U>;

    filter(
        callback: (value: T, index: number, iterable: InputIterable<T>) => unknown
    ): Iter<T>;

    limit(count: number): Iter<T>;

    from(start: number, end?: number): Iter<T>;

    flat<Depth extends number = 1>(depth?: Depth): Iter<FlatIterable<DataProvider<T>, Depth>>;

    flatMap<U extends Iterable<any>>(
        callback: (value: T, index: number, iterable: InputIterable<T>) => U
    ): Iter<U>;

    sum(): AggregationValue;

    avg(): AggregationValue;

    min(): AggregationValue;

    max(): AggregationValue;

    toArray(): T[] | Promise<T[]>;

    collect(iterable: Collectable<unknown>): Collectable<T | unknown> | Promise<Collectable<T | unknown>>;
}