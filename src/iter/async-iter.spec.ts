import assert from "assert";
import {Iter} from './';

const dataNumbers = (max = 9): AsyncIterableIterator<number> => {
    let idx = 1;
    return {
        [Symbol.asyncIterator]() {
            return this;
        },
        next() {
            if (idx <= max) {
                return Promise.resolve({done: false, value: idx++})
            }
            return Promise.resolve({done: true, value: undefined})
        }
    }
}

async function *dataNumbersForFlat() {
    yield 1;
    yield 2;
    yield [3, 4, [5, 6]];
}

async function *dataNumbersThrow() {
    yield 1;
    yield 2;
    yield 'c';
}

const getIterValues = async <T>(iterable: Iter<T>) => {
    const result = [];
    for await (const el of iterable) {
        result.push(el);
    }
    return result;
}

describe("Iter (async)", function () {
    it("Iterable", async function () {
        const iter = new Iter(dataNumbers());
        const values = await getIterValues(iter);
        assert.deepEqual(values, [1,2,3,4,5,6,7,8,9]);
    });

    it("from", async function () {
        const iter = new Iter(dataNumbers());
        const values = await getIterValues(iter.from(4));
        assert.deepEqual(values, [5,6,7,8,9]);

        const iter1 = new Iter(dataNumbers());
        const values1 = await getIterValues(iter1.from(4,6));
        assert.deepEqual(values1, [5,6,7]);
    });

    it("filter", async function () {
        const iter = new Iter(dataNumbers());
        const values = await getIterValues(iter.filter((el) => el >= 5 ));
        assert.deepEqual(values, [5,6,7,8,9]);
    });

    it("limit", async function () {
        const iter = new Iter(dataNumbers());
        const values = await getIterValues(iter.limit(3));
        assert.deepEqual(values, [1,2,3]);
    });

    it("map", async function () {
        const iter = new Iter(dataNumbers());
        const values = await getIterValues(iter.map((el) => el * 2));
        assert.deepEqual(values, [2,4,6,8,10,12,14,16,18]);
    });

    it("flat", async function () {
        const iter = new Iter(dataNumbersForFlat());
        const values = await getIterValues(iter.flat(2));
        assert.deepEqual(values, [1,2,3,4,5,6]);
    });

    it("flatMap", async function () {
        const iter = new Iter(dataNumbers(4));
        const values = await getIterValues(iter.flatMap((el) => [el,el]));
        assert.deepEqual(values, [1,1,2,2,3,3,4,4]);
    });

    it("Complex modifiers", async function () {
        const complex = new Iter(dataNumbers())
            .from(2)
            .filter((el) => el <= 7)
            .limit(4)
            .map((el) => el)
            .flatMap((el) => [el, el])
        const values = await getIterValues(complex);

        assert.deepEqual(values, [3,3,4,4,5,5,6,6]);
    });

    it("Sum", async function () {
        const sum = new Iter(dataNumbers()).sum();
        if (sum instanceof Promise) {
            await sum
                .then((data) => assert.strictEqual(data, 45))
                .catch((err) => assert.strictEqual(err, 'booom!'))
        } else {
            assert.strictEqual(false, 'booom!')
        }

        const sum2 = new Iter(dataNumbersThrow()).sum();
        if (sum2 instanceof Promise) {
            await sum2
                .then((data) => assert.strictEqual(data, 'booom!'))
                .catch((err) => assert.strictEqual(err, 'Invalid data. Sum cannot be calculated.'))
        } else {
            assert.strictEqual(false, 'booom!')
        }
    });

    it("Avg", async function () {
        const avg = new Iter(dataNumbers()).avg();
        if (avg instanceof Promise) {
            await avg
                .then((data) => assert.strictEqual(data, 5))
                .catch((err) => assert.strictEqual(err, 'booom!'))
        } else {
            assert.strictEqual(false, 'booom!')
        }

        const avg2 = new Iter(dataNumbersThrow()).avg();
        if (avg2 instanceof Promise) {
            await avg2
                .then((data) => assert.strictEqual(data, 'booom!'))
                .catch((err) => assert.strictEqual(err, 'Invalid data. Avg cannot be calculated.'))
        } else {
            assert.strictEqual(false, 'booom!')
        }
    });

    it("Min", async function () {
        const min = new Iter(dataNumbers()).min();
        if (min instanceof Promise) {
            await min
                .then((data) => assert.strictEqual(data, 1))
                .catch((err) => assert.strictEqual(err, 'booom!'))
        } else {
            assert.strictEqual(false, 'booom!')
        }

        const min2 = new Iter(dataNumbersThrow()).min();
        if (min2 instanceof Promise) {
            await min2
                .then((data) => assert.strictEqual(data, 'booom!'))
                .catch((err) => assert.strictEqual(err, 'Invalid data. Min cannot be calculated.'))
        } else {
            assert.strictEqual(false, 'booom!')
        }
    });

    it("Max", async function () {
        const max = new Iter(dataNumbers()).max();
        if (max instanceof Promise) {
            await max
                .then((data) => assert.strictEqual(data, 9))
                .catch((err) => assert.strictEqual(err, 'booom!'))
        } else {
            assert.strictEqual(false, 'booom!')
        }

        const max2 = new Iter(dataNumbersThrow()).max();
        if (max2 instanceof Promise) {
            await max2
                .then((data) => assert.strictEqual(data, 'booom!'))
                .catch((err) => assert.strictEqual(err, 'Invalid data. Max cannot be calculated.'))
        } else {
            assert.strictEqual(false, 'booom!')
        }
    });

    it("ToArray", async function () {
        const arr = new Iter(dataNumbers()).toArray();
        if (arr instanceof Promise) {
            await arr
                .then((data) => assert.deepEqual(data, [1,2,3,4,5,6,7,8,9]))
                .catch((err) => assert.strictEqual(err, 'booom!'))
        } else {
            assert.strictEqual(false, 'booom!')
        }
    });

    it("Collect", async function () {
        const collect = new Iter(dataNumbers()).collect([]);
        if (collect instanceof Promise) {
            await collect
                .then((data) => assert.deepEqual(data, [1,2,3,4,5,6,7,8,9]))
                .catch((err) => assert.strictEqual(err, 'booom!'))
        } else {
            assert.strictEqual(false, 'booom!')
        }
    });

});