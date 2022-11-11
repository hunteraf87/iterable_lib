import {CollectDestination} from "./interface";
import Iter from "./iter";

export function collect<T>(
    iter: Iter<T>,
    to: CollectDestination<any>
): CollectDestination<T> | Promise<CollectDestination<T>> {
    const array = iter.toArray();
    if (Array.isArray(to)) {
        return array;
    }
    if (array instanceof Promise) {
        return new Promise(resolve => {
            array.then((data) => resolve(new Set(data)))
        })
    }
    return new Set(array);
}
