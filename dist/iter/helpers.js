"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncToArray = exports.isAsyncIterable = exports.isIterable = exports.cast = void 0;
function cast(value) {
    return value;
}
exports.cast = cast;
function isIterable(value) {
    return value[Symbol.iterator] !== undefined;
}
exports.isIterable = isIterable;
function isAsyncIterable(value) {
    return value[Symbol.asyncIterator] !== undefined;
}
exports.isAsyncIterable = isAsyncIterable;
async function asyncToArray(data) {
    const result = [];
    for await (const el of data) {
        result.push(el);
    }
    return result;
}
exports.asyncToArray = asyncToArray;
