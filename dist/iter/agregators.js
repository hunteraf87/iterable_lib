"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncMax = exports.max = exports.asyncMin = exports.min = exports.asyncAvg = exports.avg = exports.asyncSum = exports.sum = void 0;
function sum(iterable) {
    let result = 0;
    for (const item of iterable) {
        if (typeof item !== 'number') {
            throw new Error('Invalid data. Sum cannot be calculated.');
        }
        result += item;
    }
    return result;
}
exports.sum = sum;
async function asyncSum(iterable) {
    let result = 0;
    for await (const item of iterable) {
        if (typeof item !== 'number') {
            return Promise.reject('Invalid data. Sum cannot be calculated.');
        }
        result += item;
    }
    return result;
}
exports.asyncSum = asyncSum;
function avg(iterable) {
    let result = 0, count = 0;
    for (const item of iterable) {
        if (typeof item !== 'number') {
            throw new Error('Invalid data. Avg cannot be calculated.');
        }
        result += item;
        count++;
    }
    return result / count;
}
exports.avg = avg;
async function asyncAvg(iterable) {
    let result = 0, count = 0;
    for await (const item of iterable) {
        if (typeof item !== 'number') {
            return Promise.reject('Invalid data. Avg cannot be calculated.');
        }
        result += item;
        count++;
    }
    return result / count;
}
exports.asyncAvg = asyncAvg;
function min(iterable) {
    let min = Infinity;
    for (const item of iterable) {
        if (typeof item !== 'number') {
            throw new Error('Invalid data. Min cannot be calculated.');
        }
        min = item < min ? item : min;
    }
    return min;
}
exports.min = min;
async function asyncMin(iterable) {
    let min = Infinity;
    for await (const item of iterable) {
        if (typeof item !== 'number') {
            return Promise.reject('Invalid data. Min cannot be calculated.');
        }
        min = item < min ? item : min;
    }
    return min;
}
exports.asyncMin = asyncMin;
function max(iterable) {
    let max = -Infinity;
    for (const item of iterable) {
        if (typeof item !== 'number') {
            throw new Error('Invalid data. Max cannot be calculated.');
        }
        max = item > max ? item : max;
    }
    return max;
}
exports.max = max;
async function asyncMax(iterable) {
    let max = -Infinity;
    for await (const item of iterable) {
        if (typeof item !== 'number') {
            return Promise.reject('Invalid data. Max cannot be calculated.');
        }
        max = item > max ? item : max;
    }
    return max;
}
exports.asyncMax = asyncMax;
