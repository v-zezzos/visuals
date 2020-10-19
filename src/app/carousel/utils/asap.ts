export function asap(cb: () => any, dueTime: number = 0) {
    setTimeout(cb, dueTime);
}
