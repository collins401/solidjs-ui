import type { Accessor, Signal } from 'solid-js';
const resolvedPromise = Promise.resolve() as Promise<any>;

export type MaybeAccessor<T> = T | Accessor<T>;
export type MaybeSignal<T> = MaybeAccessor<T> | Signal<T>;

export function sizeToNumber(str: number | string) {
  if (!str) return false;
  if (typeof str === 'string') {
    let numStr = str.replace(/[^0-9]/gi, '');
    return Number(numStr);
  }
  return Number(str);
}

export function isPromise(fn: unknown): fn is Promise<unknown> {
  return Object.prototype.toString.call(fn) === '[object AsyncFunction]';
}

export function isAccessor<T>(val?: unknown): val is Accessor<T> {
  return typeof val === 'function';
}

export function unAccessor<T>(r: MaybeAccessor<T>): T {
  return typeof r === 'function' ? (r as any)() : r;
}

export function nextTick<T = void>(this: T, fn?: (this: T) => void): Promise<void> {
  return fn ? resolvedPromise.then(this ? fn.bind(this) : fn) : resolvedPromise;
}
