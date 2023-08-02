import { JSX, splitProps, createSignal, createEffect } from 'solid-js';
export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  size?: number;
  block?: boolean;
  style?: any;
  class?: any;
  value?: string | number;
  onChange?: (e) => void;
}

export function Input(props: InputProps) {
  const [value, setValue] = createSignal<string | number>(props.value);
  const [local, rest] = splitProps(props, ['size', 'class', 'block', 'value', 'onChange']);

  createEffect(() => {
    setValue(local.value);
  });

  function onInput(e) {
    let val = e.target.value;
    setValue(val);
    local.onChange?.(val);
  }

  function checkValue(v) {
    let val = v.target.value;
    if (rest.type === 'number') {
      if (rest.hasOwnProperty('max') && Number(val) > Number(rest.max)) {
        val = String(rest.max);
      }
      if (rest.hasOwnProperty('max') && Number(val) < Number(rest.min)) {
        val = String(rest.min);
      }
      local.onChange?.(val);
      setValue(val);
    }
  }
  return (
    <input
      class={`so-input border-none w-full px-2 h-[32px] disabled:opacity-40 caret-primary ${
        local.class ?? ''
      }`}
      value={value()}
      onInput={onInput}
      onBlur={(e) => {
        checkValue(e);
      }}
      {...rest}
    />
  );
}
