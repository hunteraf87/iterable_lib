import {Collectable} from "./interface";
import Iter from "./iter";

export function collect<T, R>(
    iter: Iter<T>,
    to: Collectable<R>
): Collectable<T | R> {
    const addFn: Function = Reflect.get(to, 'push') || Reflect.get(to, 'add')
    for (const item of iter) {
        addFn.call(to, item)
    }
    return to;
}

export async function asyncCollect<T, R>(
    iter: Iter<T>,
    to: Collectable<R>
): Promise<Collectable<T | R>> {
    const addFn: Function = Reflect.get(to, 'push') || Reflect.get(to, 'add')
    for await (const item of iter) {
        addFn.call(to, item)
    }
    return to;
}
