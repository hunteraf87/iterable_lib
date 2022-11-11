
export type CollectDestination<T> = Array<T> | Set<T>;

export type InputIterable<T> = Iterable<T> | AsyncIterable<T>;

export type AggregationValue = number | Promise<number>;

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

    // TODO: определить тип возвращаемого значения
    // flat(depth: number);

    flatMap<U extends Iterable<any>>(
        callback: (value: T, index: number, iterable: InputIterable<T>) => U
    ): Iter<U>;

    sum(): AggregationValue;

    avg(): AggregationValue;

    min(): AggregationValue;

    max(): AggregationValue;

    toArray(): T[] | Promise<T[]>;

    collect(iterable: Iterable<unknown>): Iterable<T> | Promise<Iterable<T>>;
}