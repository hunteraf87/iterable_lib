"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collect = void 0;
function collect(iter, to) {
    const array = iter.toArray();
    if (Array.isArray(to)) {
        return array;
    }
    if (array instanceof Promise) {
        return new Promise(resolve => {
            array.then((data) => resolve(new Set(data)));
        });
    }
    return new Set(array);
}
exports.collect = collect;
