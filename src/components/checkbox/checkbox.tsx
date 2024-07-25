import { JSX, createUniqueId, createSignal, useContext, createEffect, mergeProps } from 'solid-js';
import { styled } from 'solid-styled-components';
import { useConfigProvider } from '../config-provider';
import { CheckboxGroupContext } from './checkboxGroup';
export type CheckboxValue = string | number;

export interface CheckboxProps {
  children?: JSX.Element;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  value?: CheckboxValue;
  style?: any;
  class?: any;
  inputStyle?: any;
  size?: number;
  onChange?: (val: boolean) => void;
  icon?: (checked: boolean) => JSX.Element;
}
const Label = styled('label')((props: { style: any }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
  ...props.style
}));
const Input = styled('input')((props: { style: any }) => ({
  width: '1.43em',
  height: '1.43em',
  margin: '0 3px 0 0',
  border: 'none',
  background: `url(
    "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.504 2.501l8.791-.001c1.114 0 1.519.116 1.926.334.407.218.727.538.945.945l.077.154c.168.365.257.797.257 1.772v8.59c0 1.114-.116 1.519-.334 1.926a2.272 2.272 0 0 1-.945.945l-.154.077c-.366.168-.797.257-1.772.257h-8.59c-1.115 0-1.519-.116-1.926-.334a2.272 2.272 0 0 1-.945-.945l-.077-.154c-.156-.34-.244-.736-.256-1.571L2.5 5.705c0-1.115.116-1.519.334-1.926.218-.407.538-.727.945-.945l.154-.077c.34-.156.735-.244 1.571-.256zm8.973.833H5.705c-.89 0-1.207.06-1.533.235-.262.14-.463.34-.603.603-.15.28-.216.552-.232 1.185l-.004.348v8.59c0 .89.062 1.207.236 1.533.14.262.34.463.603.603.28.15.552.216 1.185.232l.348.004h8.59l.348-.004c.633-.016.906-.082 1.185-.232.262-.14.463-.34.603-.603.15-.28.216-.552.232-1.185l.004-.348v-8.59l-.004-.348c-.016-.633-.082-.906-.232-1.185a1.439 1.439 0 0 0-.603-.603c-.302-.162-.597-.226-1.35-.235z' fill='%23999' fill-opacity='.6'/%3E%3C/svg%3E"
  ) no-repeat`,
  backgroundSize: '100%',
  '&:checked': {
    background: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.295 2.5l-8.79.001c-.837.012-1.233.1-1.572.256l-.154.077a2.272 2.272 0 0 0-.945.945c-.218.407-.334.811-.334 1.926l.001 8.79c.012.837.1 1.233.256 1.572l.077.154c.218.407.538.727.945.945.407.218.811.334 1.926.334h8.59c.975 0 1.406-.089 1.772-.257l.154-.077c.407-.218.727-.538.945-.945.218-.407.334-.812.334-1.926v-8.59c0-.975-.089-1.407-.257-1.772l-.077-.154a2.272 2.272 0 0 0-.945-.945c-.407-.218-.812-.334-1.926-.334zM7.402 13.577a.83.83 0 0 0 1.175 0l6.317-6.325a.83.83 0 1 0-1.175-1.175L7.985 11.81l-2.4-2.4a.83.83 0 1 0-1.175 1.175l2.992 2.992z' fill='${encodeURIComponent(
      props.style.color
    )}'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.577 13.577a.83.83 0 0 1-1.175 0L4.41 10.585A.83.83 0 1 1 5.585 9.41l2.4 2.4 5.734-5.733a.83.83 0 1 1 1.175 1.175l-6.317 6.325z' fill='%23fff'/%3E%3C/svg%3E") no-repeat`,
    backgroundSize: '100%'
  },
  '&:indeterminate': {
    background: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.295 2.5l-8.79.001c-.837.012-1.233.1-1.572.256l-.154.077a2.272 2.272 0 0 0-.945.945c-.218.407-.334.811-.334 1.926l.001 8.79c.012.837.1 1.233.256 1.572l.077.154c.218.407.538.727.945.945.407.218.811.334 1.926.334h8.59c.975 0 1.406-.089 1.772-.257l.154-.077c.407-.218.727-.538.945-.945.218-.407.334-.812.334-1.926v-8.59c0-.975-.089-1.407-.257-1.772l-.077-.154a2.272 2.272 0 0 0-.945-.945c-.407-.218-.812-.334-1.926-.334zm-7.628 8.333h6.666a.836.836 0 0 0 .834-.833.836.836 0 0 0-.834-.833H6.667a.836.836 0 0 0-.834.833c0 .458.375.833.834.833z' fill='${encodeURIComponent(
      props.style.color
    )}'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.333 10.833H6.667A.836.836 0 0 1 5.833 10c0-.458.375-.833.834-.833h6.666c.459 0 .834.375.834.833a.836.836 0 0 1-.834.833z' fill='%23fff'/%3E%3C/svg%3E") no-repeat`,
    backgroundSize: '100%'
  },
  '&:disabled': {
    opacity: 0.4
  },
  ...props.style
}));
export function Checkbox(props: CheckboxProps) {
  const [checked, setChecked] = createSignal(props.checked);
  const { theme } = useConfigProvider();
  const defaultProps = mergeProps({ inputStyle: { color: theme.colorPrimary } }, props);
  const id = createUniqueId();
  const groupContext = useContext(CheckboxGroupContext);
  createEffect(() => {
    setChecked(props.checked);
    if (groupContext) {
      // console.log('groupContext', groupContext, props);
    }
  });
  function changeInput(e) {
    setChecked(e);
    props.onChange?.(e);
    if (groupContext) {
      if (e) {
        groupContext.check(props.value);
      } else {
        groupContext.uncheck(props.value);
      }
    }
  }
  return (
    <Label for={id} class={`san-checkbox ${props.class ?? ''}`} style={props.style}>
      <Input
        type="checkbox"
        id={id}
        indeterminate={props.indeterminate}
        checked={checked()}
        disabled={props.disabled}
        onInput={({ target: { checked } }) => changeInput(checked)}
        style={{ ...defaultProps.inputStyle }}
      />
      <span>{props.children}</span>
    </Label>
  );
}
