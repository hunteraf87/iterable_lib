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
var _DataProvider_rawData;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
class DataProvider {
    constructor(data) {
        _DataProvider_rawData.set(this, void 0);
        __classPrivateFieldSet(this, _DataProvider_rawData, (0, helpers_1.cast)(data), "f");
    }
    isIterable() {
        return (0, helpers_1.isIterable)(__classPrivateFieldGet(this, _DataProvider_rawData, "f"));
    }
    [(_DataProvider_rawData = new WeakMap(), Symbol.iterator)]() {
        return this.values();
    }
    [Symbol.asyncIterator]() {
        return this.asyncValues();
    }
    values() {
        const iterator = (0, helpers_1.isIterable)(__classPrivateFieldGet(this, _DataProvider_rawData, "f")) ? __classPrivateFieldGet(this, _DataProvider_rawData, "f")[Symbol.iterator]() : null;
        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                if (iterator !== null) {
                    return iterator.next();
                }
                return { done: true, value: undefined };
            }
        };
    }
    asyncValues() {
        const iterator = (0, helpers_1.isAsyncIterable)(__classPrivateFieldGet(this, _DataProvider_rawData, "f")) ? __classPrivateFieldGet(this, _DataProvider_rawData, "f")[Symbol.asyncIterator]() : null;
        return {
            [Symbol.asyncIterator]() {
                return this;
            },
            next() {
                if (iterator !== null) {
                    return iterator.next();
                }
                return Promise.resolve({ done: true, value: undefined });
            }
        };
    }
    reverse() {
        const reverseIterator = () => {
            if (typeof __classPrivateFieldGet(this, _DataProvider_rawData, "f").reverse === 'function') {
                if (Array.isArray(__classPrivateFieldGet(this, _DataProvider_rawData, "f"))) {
                    const reversedArray = Array.from(__classPrivateFieldGet(this, _DataProvider_rawData, "f")).reverse();
                    return reversedArray[Symbol.iterator]();
                }
                else {
                    return __classPrivateFieldGet(this, _DataProvider_rawData, "f").reverse();
                }
            }
            return null;
        };
        const iterator = reverseIterator();
        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                if (iterator !== null) {
                    return iterator.next();
                }
                return { done: true, value: undefined };
            }
        };
    }
}
exports.default = DataProvider;
