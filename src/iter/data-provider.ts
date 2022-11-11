import {DataProvider as AbstractDataProvider, InputIterable, RawData} from "./interface";
import {cast, isAsyncIterable, isIterable} from "./helpers";

export default class DataProvider<T> implements AbstractDataProvider<T> {
    readonly #rawData: RawData<T>;

    constructor(data: InputIterable<T>) {
        this.#rawData = cast(data);
    }

    isIterable(): boolean {
        return isIterable(this.#rawData);
    }

    [Symbol.iterator](): IterableIterator<T> {
        return this.values();
    }

    [Symbol.asyncIterator](): AsyncIterableIterator<T> {
        return this.asyncValues();
    }

    values(): IterableIterator<T> {
        const iterator = isIterable(this.#rawData) ? this.#rawData[Symbol.iterator]() : null;
        return {
            [Symbol.iterator](): IterableIterator<T> {
                return this;
            },
            next(): IteratorResult<T> {
                if (iterator !== null) {
                    return iterator.next();
                }
                return { done: true, value: undefined }
            }
        }
    }

    asyncValues(): AsyncIterableIterator<T> {
        const iterator = isAsyncIterable(this.#rawData) ? this.#rawData[Symbol.asyncIterator]() : null;
        return {
            [Symbol.asyncIterator](): AsyncIterableIterator<T> {
                return this;
            },
            next(): Promise<IteratorResult<T>> {
                if (iterator !== null) {
                    return iterator.next();
                }
                return Promise.resolve({ done: true, value: undefined })
            }
        }
    }

    reverse(): IterableIterator<T> {

        const reverseIterator = () => {
            if (typeof this.#rawData.reverse === 'function') {
                if (Array.isArray(this.#rawData)) {
                    const reversedArray = Array.from(this.#rawData).reverse();
                    return reversedArray[Symbol.iterator]();
                } else {
                    return this.#rawData.reverse();
                }
            }
            return null;
        }

        const iterator = reverseIterator();

        return {
            [Symbol.iterator](): IterableIterator<T> {
                return this;
            },
            next(): IteratorResult<T> {
                if (iterator !== null) {
                    return iterator.next();
                }
                return { done: true, value: undefined }
            }
        }
    }
}