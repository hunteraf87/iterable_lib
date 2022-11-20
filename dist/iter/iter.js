"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Iter_data;
Object.defineProperty(exports, "__esModule", { value: true });
const generators_1 = require("./generators");
const agregators_1 = require("./agregators");
const collectors_1 = require("./collectors");
const data_provider_1 = __importDefault(require("./data-provider"));
const helpers_1 = require("./helpers");
class Iter {
    constructor(data) {
        _Iter_data.set(this, void 0);
        if (typeof data === 'number') {
            __classPrivateFieldSet(this, _Iter_data, new data_provider_1.default((0, helpers_1.cast)((0, generators_1.naturalNumbers)(data))), "f");
        }
        else {
            __classPrivateFieldSet(this, _Iter_data, new data_provider_1.default(data), "f");
        }
    }
    [(_Iter_data = new WeakMap(), Symbol.iterator)]() {
        return __classPrivateFieldGet(this, _Iter_data, "f").values();
    }
    [Symbol.asyncIterator]() {
        return __classPrivateFieldGet(this, _Iter_data, "f").asyncValues();
    }
    reverse() {
        return new Iter(__classPrivateFieldGet(this, _Iter_data, "f").reverse());
    }
    map(callback) {
        return new Iter(__classPrivateFieldGet(this, _Iter_data, "f").isIterable() ? (0, generators_1.map)(__classPrivateFieldGet(this, _Iter_data, "f"), callback) : (0, generators_1.asyncMap)(__classPrivateFieldGet(this, _Iter_data, "f"), callback));
    }
    filter(callback) {
        return new Iter(__classPrivateFieldGet(this, _Iter_data, "f").isIterable() ? (0, generators_1.filter)(__classPrivateFieldGet(this, _Iter_data, "f"), callback) : (0, generators_1.asyncFilter)(__classPrivateFieldGet(this, _Iter_data, "f"), callback));
    }
    limit(count) {
        return new Iter(__classPrivateFieldGet(this, _Iter_data, "f").isIterable() ? (0, generators_1.limit)(__classPrivateFieldGet(this, _Iter_data, "f"), count) : (0, generators_1.asyncLimit)(__classPrivateFieldGet(this, _Iter_data, "f"), count));
    }
    from(start = 0, end) {
        return new Iter(__classPrivateFieldGet(this, _Iter_data, "f").isIterable() ? (0, generators_1.from)(__classPrivateFieldGet(this, _Iter_data, "f"), start, end) : (0, generators_1.asyncFrom)(__classPrivateFieldGet(this, _Iter_data, "f"), start, end));
    }
    flat(depth) {
        return new Iter(__classPrivateFieldGet(this, _Iter_data, "f").isIterable() ? (0, generators_1.flat)(__classPrivateFieldGet(this, _Iter_data, "f"), depth) : (0, generators_1.asyncFlat)(__classPrivateFieldGet(this, _Iter_data, "f"), depth));
    }
    flatMap(callback) {
        return new Iter(__classPrivateFieldGet(this, _Iter_data, "f").isIterable() ? (0, generators_1.flatMap)(__classPrivateFieldGet(this, _Iter_data, "f"), callback) : (0, generators_1.asyncFlatMap)(__classPrivateFieldGet(this, _Iter_data, "f"), callback));
    }
    sum() {
        return __classPrivateFieldGet(this, _Iter_data, "f").isIterable() ? (0, agregators_1.sum)(__classPrivateFieldGet(this, _Iter_data, "f")) : (0, agregators_1.asyncSum)(__classPrivateFieldGet(this, _Iter_data, "f"));
    }
    avg() {
        return __classPrivateFieldGet(this, _Iter_data, "f").isIterable() ? (0, agregators_1.avg)(__classPrivateFieldGet(this, _Iter_data, "f")) : (0, agregators_1.asyncAvg)(__classPrivateFieldGet(this, _Iter_data, "f"));
    }
    min() {
        return __classPrivateFieldGet(this, _Iter_data, "f").isIterable() ? (0, agregators_1.min)(__classPrivateFieldGet(this, _Iter_data, "f")) : (0, agregators_1.asyncMin)(__classPrivateFieldGet(this, _Iter_data, "f"));
    }
    max() {
        return __classPrivateFieldGet(this, _Iter_data, "f").isIterable() ? (0, agregators_1.max)(__classPrivateFieldGet(this, _Iter_data, "f")) : (0, agregators_1.asyncMax)(__classPrivateFieldGet(this, _Iter_data, "f"));
    }
    collect(to) {
        return __classPrivateFieldGet(this, _Iter_data, "f").isIterable() ? (0, collectors_1.collect)(this, to) : (0, collectors_1.asyncCollect)(this, to);
    }
    toArray() {
        if (__classPrivateFieldGet(this, _Iter_data, "f").isIterable()) {
            return [...__classPrivateFieldGet(this, _Iter_data, "f").values()];
        }
        return (0, helpers_1.asyncToArray)(__classPrivateFieldGet(this, _Iter_data, "f").asyncValues());
    }
}
exports.default = Iter;
