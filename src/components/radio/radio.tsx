import { JSX, createUniqueId, createSignal, useContext, createEffect } from 'solid-js';
import { styled } from 'solid-styled-components';
import { useConfigProvider } from '../config-provider';
import { RadioGroupContext } from './radioGroup';
export type RadioValue = string | number;

export interface RadioProps {
  children?: JSX.Element;
  checked?: boolean;
  disabled?: boolean;
  value?: RadioValue;
  style?: any;
  class?: any;
  onChange?: (val: boolean) => void;
  icon?: (checked: boolean) => JSX.Element;
}
const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
`;
const Input = styled('input')((props: any) => ({
  width: '1.1em',
  height: '1.1em',
  margin: '0 3px 0 0',
  border: 'none',
  background: `url(
    "data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 .667A8.336 8.336 0 0 0 .667 9c0 4.6 3.733 8.333 8.333 8.333S17.333 13.6 17.333 9 13.6.667 9 .667zM9 16.5A7.498 7.498 0 0 1 1.5 9c0-4.144 3.356-7.5 7.5-7.5s7.5 3.356 7.5 7.5-3.356 7.5-7.5 7.5z' fill='%23333' fill-opacity='.6'/%3E%3C/svg%3E"
  ) no-repeat`,
  backgroundSize: '100%',
  '&:checked': {
    background: `url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 .667A8.336 8.336 0 0 0 .667 9c0 4.6 3.733 8.333 8.333 8.333S17.333 13.6 17.333 9 13.6.667 9 .667zM9 11.5a2.5 2.5 0 1 1-.001-4.999A2.5 2.5 0 0 1 9 11.5z' fill='${props.fill}'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 11.5a2.5 2.5 0 1 1-.001-4.999A2.5 2.5 0 0 1 9 11.5z' fill='%23fff'/%3E%3C/svg%3E")`,
    backgroundSize: '100%'
  },
  '&:disabled': {
    opacity: 0.4
  },
  ...props.style
}));
export function Radio(props: RadioProps) {
  const [checked, setChecked] = createSignal(props.checked);
  const id = createUniqueId();
  const { theme } = useConfigProvider();
  const groupContext = useContext(RadioGroupContext);
  createEffect(() => {
    setChecked(props.checked);
    if (groupContext) {
      // console.log('groupContext', groupContext, props);
      // setChecked(groupContext.value.includes());
    }
  });
  function changeInput(e) {
    setChecked(e.target.checked);
    props.onChange?.(e.target.checked);
    if (groupContext) {
      if (e.target.checked) {
        groupContext.check(props.value);
      }
    }
  }
  return (
    <Label for={id} class={`${theme.classPrefix}-checkbox`}>
      <Input
        type="radio"
        class={`${theme.classPrefix}-checkbox--input ${props.class || ''}`}
        id={id}
        checked={checked()}
        disabled={props.disabled}
        onInput={changeInput}
        style={props.style}
        fill={encodeURIComponent(theme.colorPrimary)}
      />
      <span>{props.children}</span>
    </Label>
  );
}
