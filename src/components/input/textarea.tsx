import { JSX, splitProps, createSignal, createEffect } from 'solid-js';
import { css } from 'solid-styled-components';
import { useConfigProvider } from '../config-provider';
export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  size?: number;
  block?: boolean;
  style?: any;
  clsss?: any;
  value?: string | number;
  onChange?: (e) => void;
}

export function Textarea(props: InputProps) {
  const { theme } = useConfigProvider();
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
      if (rest.hasOwnProperty('max') && Number(val) > rest.max) {
        val = String(rest.max);
      }
      if (rest.hasOwnProperty('max') && Number(val) < rest.min) {
        val = String(rest.min);
      }
      local.onChange?.(val);
      setValue(val);
    }
  }
  return (
    <input
      class={`${theme.classPrefix}-input ${css`
        border: none;
        padding: 0 8px;
        width: 100%;
        background: transparent;
        height: ${local.size ? local.size + 'px' : '30px'};
        &:disabled {
          opacity: 0.4;
        }
      `} ${local.class ?? ''}`}
      value={value()}
      onInput={onInput}
      onBlur={(e) => {
        checkValue(e);
      }}
      {...rest}
    />
  );
}
