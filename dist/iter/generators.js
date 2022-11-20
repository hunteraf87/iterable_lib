"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncFlatMap = exports.flatMap = exports.asyncFlat = exports.flat = exports.asyncFrom = exports.from = exports.asyncMap = exports.map = exports.asyncLimit = exports.limit = exports.asyncFilter = exports.filter = exports.naturalNumbers = void 0;
const helpers_1 = require("./helpers");
function* naturalNumbers(max) {
    let i = 1;
    while (i <= max) {
        yield i;
        i++;
    }
}
exports.naturalNumbers = naturalNumbers;
function* filter(iterable, callback) {
    let idx = 0;
    for (const item of iterable) {
        if (callback(item, idx, iterable)) {
            yield item;
            idx++;
        }
    }
}
exports.filter = filter;
async function* asyncFilter(iterable, callback) {
    let idx = 0;
    for await (const item of iterable) {
        if (callback(item, idx, iterable)) {
            yield item;
            idx++;
        }
    }
}
exports.asyncFilter = asyncFilter;
function* limit(iterable, count) {
    let i = 0;
    const iter = iterable[Symbol.iterator]();
    while (i++ < count) {
        const next = iter.next();
        if (!next.done) {
            yield next.value;
        }
        else {
            break;
        }
    }
}
exports.limit = limit;
async function* asyncLimit(iterable, count) {
    let i = 0;
    for await (const item of iterable) {
        if (i < count) {
            yield item;
            i++;
        }
        else {
            break;
        }
    }
}
exports.asyncLimit = asyncLimit;
function* map(iterable, callback) {
    let idx = 0;
    for (const item of iterable) {
        yield callback(item, idx, iterable);
        idx++;
    }
}
exports.map = map;
async function* asyncMap(iterable, callback) {
    let idx = 0;
    for await (const item of iterable) {
        yield callback(item, idx, iterable);
        idx++;
    }
}
exports.asyncMap = asyncMap;
function* from(iterable, from = 0, to) {
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
exports.from = from;
async function* asyncFrom(iterable, from = 0, to) {
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
exports.asyncFrom = asyncFrom;
function* flat(iterable, depth) {
    const d = depth !== undefined ? depth : 1;
    for (const item of iterable) {
        if ((0, helpers_1.isIterable)(item) && d > 0) {
            yield* flat((0, helpers_1.cast)(item), d - 1);
            continue;
        }
        yield item;
    }
}
exports.flat = flat;
async function* asyncFlat(iterable, depth) {
    const d = depth !== undefined ? depth : 1;
    for await (const item of iterable) {
        if ((0, helpers_1.isIterable)(item) && d > 0) {
            yield* (0, helpers_1.cast)(flat(item, d - 1));
            continue;
        }
        yield item;
    }
}
exports.asyncFlat = asyncFlat;
function* flatMap(iterable, callback) {
    let idx = 0;
    for (const item of iterable) {
        const value = callback(item, idx, iterable);
        yield* flat(value, 0);
        idx++;
    }
}
exports.flatMap = flatMap;
async function* asyncFlatMap(iterable, callback) {
    let idx = 0;
    for await (const item of iterable) {
        const value = callback(item, idx, iterable);
        yield* flat(value, 0);
        idx++;
    }
}
exports.asyncFlatMap = asyncFlatMap;
