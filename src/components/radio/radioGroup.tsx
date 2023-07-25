import {
  For,
  JSXElement,
  Match,
  Switch,
  createContext,
  createSignal,
  mergeProps,
  createEffect
} from 'solid-js';
import { RadioValue } from './radio';
import { useConfigProvider } from '../config-provider';
import { Radio } from './radio';
import { OptionType } from '../checkbox/checkboxGroup';
export interface RadioGroupProps {
  defaultValue?: RadioValue;
  disabled?: boolean;
  onChange?: (value: RadioValue) => void;
  value?: RadioValue;
  class?: any;
  children?: JSXElement;
  options?: OptionType[];
}
export const RadioGroupContext = createContext<{
  value: RadioValue;
  disabled: boolean;
  check: (val: RadioValue) => void;
} | null>(null);

const defaultProps = {
  disabled: false,
  defaultValue: []
};
export function RadioGroup(props: RadioGroupProps) {
  const { theme } = useConfigProvider();
  const mainProps = mergeProps(defaultProps, props);
  const [value, setValue] = createSignal<RadioValue>(props.value);
  createEffect(() => {
    setValue(mainProps.value);
  });
  createEffect(() => {
    // console.log('value', value());
  });
  return (
    <RadioGroupContext.Provider
      value={{
        value: value(),
        disabled: mainProps.disabled,
        check: (v) => {
          console.log('radiocheck', v);
          setValue(v);
          props.onChange?.(v);
        }
      }}
    >
      <div class={`${theme.classPrefix}-checkbox-group ${mainProps.class || ''}`}>
        <Switch>
          <Match when={props.options}>
            <For each={props.options}>
              {(option, i) => (
                <Radio checked={value() === option.value} value={option.value}>
                  {option.label}
                </Radio>
              )}
            </For>
          </Match>
          <Match when={!props.options}>{props.children}</Match>
        </Switch>
      </div>
    </RadioGroupContext.Provider>
  );
}
