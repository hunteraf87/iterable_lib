import assert from "assert";
import {Iter} from './';

const dataNumbers = [1,2,3,4,5,6,7,8,9];
const dataSetNumbers = new Set([1,2,3,4,5,6,7,8,9]);
const dataString = 'teststring'

describe("Iter", function () {
    it("Iterable", function () {
        const iter = new Iter(dataNumbers);
        assert.deepEqual([...iter], [1,2,3,4,5,6,7,8,9]);

        const iter2 = new Iter(dataSetNumbers);
        assert.deepEqual([...iter2], [1,2,3,4,5,6,7,8,9]);

        const iter3 = new Iter(dataString);
        assert.deepEqual([...iter3].join(''), 'teststring');

        const iter4 = new Iter(10);
        assert.deepEqual([...iter4], [1,2,3,4,5,6,7,8,9,10]);
    });

    it("Reverse", function () {
        const iter = new Iter(dataNumbers);
        assert.deepEqual([...iter.reverse()], Array.from(dataNumbers).reverse());
    });

    it("from", function () {
        const iter = new Iter(dataNumbers);
        assert.deepEqual([...iter.from(4)], [5,6,7,8,9]);

        const iter4 = new Iter(dataNumbers);
        assert.deepEqual([...iter4.from(4,6)], [5,6,7]);

        const iter2 = new Iter(dataSetNumbers);
        assert.deepEqual([...iter2.from(5)], [6,7,8,9]);

        const iter5 = new Iter(dataSetNumbers);
        assert.deepEqual([...iter5.from(4,6)], [5,6,7]);

        const iter3 = new Iter(dataString);
        assert.deepEqual([...iter3.from(3)].join(''), 'tstring');

        const iter6 = new Iter(dataString);
        assert.deepEqual([...iter6.from(3,6)].join(''), 'tstr');
    });

    it("filter", function () {
        const iter = new Iter(dataNumbers);
        assert.deepEqual([...iter.filter((el) => el >= 5 )], [5,6,7,8,9]);

        const iter2 = new Iter(dataSetNumbers);
        assert.deepEqual([...iter2.filter((el) => el > 5 )], [6,7,8,9]);

        const iter3 = new Iter(dataString);
        assert.deepEqual([...iter3.filter((el) => el !== 't' )].join(''), 'essring');
    });

    it("limit", function () {
        const iter = new Iter(dataNumbers);
        assert.deepEqual([...iter.limit(3)], [1,2,3]);

        const iter2 = new Iter(dataSetNumbers);
        assert.deepEqual([...iter2.limit(4)], [1,2,3,4]);

        const iter3 = new Iter(dataString);
        assert.deepEqual([...iter3.limit(4)].join(''), 'test');
    });

    it("map", function () {
        const iter = new Iter(dataNumbers);
        assert.deepEqual([...iter.map((el) => el * 2)], [2,4,6,8,10,12,14,16,18]);

        const iter2 = new Iter(dataSetNumbers);
        assert.deepEqual([...iter2.map((el) => el * 2)], [2,4,6,8,10,12,14,16,18]);

        const iter3 = new Iter(dataString);
        assert.deepEqual([...iter3.map((el) => el + 1)].join(''), 't1e1s1t1s1t1r1i1n1g1');
    });

    it("flat", function () {
        const iter = new Iter([1,2,[3,4,[5,6]]]);
        assert.deepEqual([...iter.flat(2)], [1,2,3,4,5,6]);

        const iter2 = new Iter(new Set([1,2,[3,4,[5,6]]]));
        assert.deepEqual([...iter2.flat(2)], [1,2,3,4,5,6]);
    });

    it("flatMap", function () {
        const iter = new Iter([1,2,3,4]);
        assert.deepEqual([...iter.flatMap((el) => [el,el])], [1,1,2,2,3,3,4,4]);

        const iter2 = new Iter(new Set([1,2,3]));
        assert.deepEqual([...iter2.flatMap((el) => new Set([el, el + 5]))], [1,6,2,7,3,8]);

        const iter3 = new Iter(dataString);
        assert.deepEqual([...iter3.flatMap((el) => new Set([el, 5]))].join(''), 't5e5s5t5s5t5r5i5n5g5');
    });

    it("Complex modifiers", function () {
        const iter = new Iter(dataNumbers);
        const complex = iter
            .from(2)
            .filter((el) => el <= 7)
            .limit(4)
            .map((el) => el)
            .flatMap((el) => [el, el])

        assert.deepEqual([...complex], [3,3,4,4,5,5,6,6]);

        const iter2 = new Iter(dataSetNumbers);
        const complex2 = iter2
            .from(2)
            .filter((el) => el <= 7)
            .limit(4)
            .map((el) => el)
            .flatMap((el) => [el, el])

        assert.deepEqual([...complex2], [3,3,4,4,5,5,6,6]);

        const iter3 = new Iter(dataString);
        const complex3 = iter3
            .from(2)
            .filter((el, idx) => idx <= 7)
            .limit(4)
            .map((el) => el)
            .flatMap((el) => [el, el])

        assert.deepEqual([...complex3].join(''), 'ssttsstt');
    });

    it("Sum", function () {
        const iter = new Iter(dataNumbers);
        assert.strictEqual(iter.sum(), 45);

        const iter2 = new Iter(dataSetNumbers);
        assert.strictEqual(iter2.sum(), 45);

        const iter3 = new Iter([12, 'c']);
        assert.throws(() => iter3.sum(), Error);
    });

    it("Avg", function () {
        const iter = new Iter([4,6,8]);
        assert.strictEqual(iter.avg(), 6);

        const iter2 = new Iter(new Set([4,6,8]));
        assert.strictEqual(iter2.avg(), 6);

        const iter3 = new Iter([12, 'c']);
        assert.throws(() => iter3.avg(), Error);
    });

    it("Min", function () {
        const iter = new Iter(dataNumbers);
        assert.strictEqual(iter.min(), 1);

        const iter2 = new Iter(dataSetNumbers);
        assert.strictEqual(iter2.min(), 1);

        const iter3 = new Iter([12, 'c']);
        assert.throws(() => iter3.min(), Error);
    });

    it("Max", function () {
        const iter = new Iter(dataNumbers);
        assert.strictEqual(iter.max(), 9);

        const iter2 = new Iter(dataSetNumbers);
        assert.strictEqual(iter2.max(), 9);

        const iter3 = new Iter([12, 'c']);
        assert.throws(() => iter3.max(), Error);
    });

    it("ToArray", function () {
        const iter = new Iter(dataNumbers);
        assert.deepEqual(iter.toArray(), [1,2,3,4,5,6,7,8,9]);

        const iter2 = new Iter(dataSetNumbers);
        assert.deepEqual(iter2.toArray(), [1,2,3,4,5,6,7,8,9]);

        const iter3 = new Iter(dataString);
        assert.deepEqual(iter3.toArray(), ['t','e','s','t','s','t','r','i','n','g']);
    });

    it("Collect", function () {
        const iter = new Iter(dataNumbers);
        assert.deepEqual(iter.collect([]), [1,2,3,4,5,6,7,8,9]);

        const iter2 = new Iter(dataSetNumbers);
        assert.deepEqual(iter2.collect(new Set()), new Set([1,2,3,4,5,6,7,8,9]));

        const iter3 = new Iter(dataString);
        assert.deepEqual(iter3.collect(new Set()), new Set(['t','e','s','t','s','t','r','i','n','g']));
    });
});