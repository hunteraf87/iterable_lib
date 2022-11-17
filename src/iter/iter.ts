import {
    Iter as AbstractIter,
    InputIterable, AggregationValue, Collectable
} from "./interface";
import {
    filter, limit, map, from, flat, asyncFlat, flatMap, naturalNumbers, asyncMap,
    asyncFilter,asyncLimit, asyncFrom, asyncFlatMap
} from "./generators";
import {sum, avg, max, min, asyncMax, asyncMin, asyncSum, asyncAvg} from "./agregators";
import {asyncCollect, collect} from "./collectors";
import DataProvider from "./data-provider";
import {asyncToArray, cast} from './helpers';

export default class Iter<T> implements AbstractIter<T> {
    readonly #data: DataProvider<T>;

    constructor(data: InputIterable<T> | number) {
        if (typeof data === 'number') {
            this.#data = new DataProvider(cast(naturalNumbers(data)));
        } else {
            this.#data = new DataProvider(data);
        }
    }

    [Symbol.iterator](): IterableIterator<T> {
        return this.#data.values();
    }

    [Symbol.asyncIterator](): AsyncIterableIterator<T> {
        return this.#data.asyncValues();
    }

    reverse(): Iter<T> {
        return new Iter(this.#data.reverse());
    }
    
    map<U>(
        callback: (value: T, index: number, iterable: InputIterable<T>) => U
    ): Iter<U>{
        return new Iter(
            this.#data.isIterable() ? map(this.#data, callback) : asyncMap(this.#data, callback)
        );
    }

    filter(
        callback: (value: T, index: number, iterable: InputIterable<T>) => unknown
    ): Iter<T>{
        return new Iter(
            this.#data.isIterable() ? filter(this.#data, callback) : asyncFilter(this.#data, callback)
        );
    }

    limit(count: number): Iter<T> {
        return new Iter(
            this.#data.isIterable() ? limit(this.#data, count) : asyncLimit(this.#data, count)
        );
    }

    from(start = 0, end?: number): Iter<T> {
        return new Iter(
            this.#data.isIterable() ? from(this.#data, start, end) : asyncFrom(this.#data, start, end)
        );
    }

    flat(depth = 1) {
        return new Iter(
            this.#data.isIterable() ? flat(this.#data, depth) : asyncFlat(this.#data, depth)
        );
    }

    flatMap<U extends Iterable<any>>(
        callback: (value: T, index: number, iterable: InputIterable<T>) => U
    ): Iter<U> {
        return new Iter(
            this.#data.isIterable() ? flatMap(this.#data, callback) : asyncFlatMap(this.#data, callback)
        );
    }

    sum(): AggregationValue  {
        return this.#data.isIterable() ? sum(this.#data) : asyncSum(this.#data);
    }

    avg(): AggregationValue  {
        return this.#data.isIterable() ? avg(this.#data) : asyncAvg(this.#data);
    }

    min(): AggregationValue {
        return this.#data.isIterable() ? min(this.#data) : asyncMin(this.#data);
    }

    max(): AggregationValue {
        return this.#data.isIterable() ? max(this.#data) : asyncMax(this.#data);
    }

    collect<R>(to: Collectable<R>): Collectable<T | R> | Promise<Collectable<T | R>> {
        return this.#data.isIterable() ? collect(this, to) : asyncCollect(this, to);
    }

    toArray(): T[] | Promise<T[]>{
        if (this.#data.isIterable()) {
            return [...this.#data.values()];
        }
        return asyncToArray(this.#data.asyncValues())
    }
}