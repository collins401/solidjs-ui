import { createSignal, createMemo } from 'solid-js';
import type { Accessor, Signal } from 'solid-js';
import { isAccessor, unAccessor, MaybeAccessor, MaybeSignal } from './index';
export interface UseToggleOptions<Truthy, Falsy> {
  truthyValue?: MaybeAccessor<Truthy>;
  falsyValue?: MaybeAccessor<Falsy>;
}
export function useToggle<Truthy, Falsy, T = Truthy | Falsy>(
  initialValue: Signal<T>,
  options?: UseToggleOptions<Truthy, Falsy>
): [Accessor<T>, (value?: T) => T];

export function useToggle<Truthy = true, Falsy = false, T = Truthy | Falsy>(
  initialValue?: T,
  options?: UseToggleOptions<Truthy, Falsy>
): [Accessor<T>, (value?: T) => T];

/**
 * A boolean Signal with a toggler
 *
 * @param [initialValue=false]
 */
export function useToggle(
  initialValue: MaybeSignal<boolean> = false,
  options: UseToggleOptions<any, any> = {}
) {
  const { truthyValue = true, falsyValue = false } = options;

  const [_value, setValue] = createSignal(isAccessor(initialValue) ? initialValue() : initialValue);

  function toggle(value?: boolean) {
    // has arguments
    if (arguments.length) {
      setValue(value!);
      return _value();
    }
    const truthy = unAccessor(truthyValue);
    setValue(_value() === truthy ? unAccessor(falsyValue) : truthy);
    return _value();
  }

  if (isAccessor(initialValue)) return toggle;
  return [_value, toggle] as const;
}
