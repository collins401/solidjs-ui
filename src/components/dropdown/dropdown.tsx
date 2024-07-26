import clsx from 'clsx';
import { useConfigProvider } from '../config-provider';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';

export interface DropdownProps {
  children?: string | JSX.Element;
  onChange?: (val: any) => void;
  class?: any;
  classList?: any;
}
export interface DropdownItemProps {
  children?: string | JSX.Element;
  onChange?: (val: any) => void;
  class?: any;
  classList?: any;
}
const CartIcon = (props) => (
  <svg
    class={props.class || ''}
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect fill="#FFFFFF" opacity="0" x="0" y="0" width="48" height="48" />
      <path
        d="M40.6640052,13 L7.34128264,13 C6.57572302,13 5.83336217,13.2619065 5.23947349,13.7351762 C3.80578911,14.8838891 3.58308085,16.9699517 4.74301968,18.3897608 L21.404381,38.7725222 C21.5528531,38.9517214 21.7152446,39.1171361 21.9008348,39.2641713 C23.3345192,40.4128842 25.4363283,40.1923313 26.6009069,38.7725222 L43.2576284,18.3897608 C43.740163,17.8016198 44,17.0664436 44,16.3082931 C44.004629,14.4795422 42.505988,13 40.6640052,13 Z"
        fill="currentColor"
        fill-rule="nonzero"
      />
    </g>
  </svg>
);
const DropdownItem = (props: DropdownItemProps) => {
  return (
    <div class="flex-1 flex justify-center items-center text-center py-2.5">
      <div class="mr-1">{props.children}</div>
      <CartIcon class="text-12px scale-75 text-gray-400" />
    </div>
  );
};
export function Dropdown(props: DropdownProps) {
  const [local] = splitProps(props, ['children', 'onChange']);
  const { theme } = useConfigProvider();

  return (
    <div
      class={clsx(
        `${theme.classPrefix}-dropdown`,
        'bg-color text-current flex items-center justify-center'
      )}
    >
      {local.children}
    </div>
  );
}
Dropdown.Item = DropdownItem;
