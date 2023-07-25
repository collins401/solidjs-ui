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
import { CheckboxValue } from './checkbox';
import { useConfigProvider } from '../config-provider';
import { Checkbox } from './checkbox';
export interface OptionType {
  value: string | number;
  label: string;
}
export interface CheckboxGroupProps {
  defaultValue?: CheckboxValue[];
  disabled?: boolean;
  onChange?: (value: CheckboxValue[]) => void;
  value?: CheckboxValue[];
  children?: JSXElement;
  options?: OptionType[];
  class?: string;
}
export const CheckboxGroupContext = createContext<{
  value: CheckboxValue[];
  disabled: boolean;
  check: (val: CheckboxValue) => void;
  uncheck: (val: CheckboxValue) => void;
} | null>(null);

const defaultProps = {
  disabled: false,
  defaultValue: []
};
export function CheckboxGroup(props: CheckboxGroupProps) {
  const { theme } = useConfigProvider();
  const mainProps = mergeProps(defaultProps, props);
  const [value, setValue] = createSignal<CheckboxValue[]>(props.value);
  createEffect(() => {
    // console.log('value', value());
  });
  return (
    <CheckboxGroupContext.Provider
      value={{
        value: value(),
        disabled: mainProps.disabled,
        check: (v) => {
          const vals = [...value(), v];
          setValue(vals);
          props.onChange?.(vals);
        },
        uncheck: (v) => {
          const vals = value().filter((item) => item !== v);
          setValue(vals);
          props.onChange?.(vals);
        }
      }}
    >
      <div class={`${theme.classPrefix}-checkbox-group ${mainProps.class}`}>
        <Switch>
          <Match when={props.options}>
            <For each={props.options}>
              {(option, i) => (
                <Checkbox checked={value().includes(option.value)} value={option.value}>
                  {option.label}
                </Checkbox>
              )}
            </For>
          </Match>
          <Match when={!props.options}>{props.children}</Match>
        </Switch>
      </div>
    </CheckboxGroupContext.Provider>
  );
}
