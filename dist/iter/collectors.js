"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncCollect = exports.collect = void 0;
function collect(iter, to) {
    const addFn = Reflect.get(to, 'push') || Reflect.get(to, 'add');
    for (const item of iter) {
        addFn.call(to, item);
    }
    return to;
}
exports.collect = collect;
async function asyncCollect(iter, to) {
    const addFn = Reflect.get(to, 'push') || Reflect.get(to, 'add');
    for await (const item of iter) {
        addFn.call(to, item);
    }
    return to;
}
exports.asyncCollect = asyncCollect;
