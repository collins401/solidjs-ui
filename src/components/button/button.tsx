import type { JSX } from 'solid-js';
import { createEffect, createSignal, Show, splitProps } from 'solid-js';
import { Loading } from '../loading';
import { isPromise } from '../utils';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

export type ButtonBaseProps = VariantProps<typeof button>;
const button = cva('so-button', {
  variants: {
    type: {
      primary: ['bg-primary', 'text-white', 'border-primary'],
      secondary: ['bg-secondary', 'text-white', 'border-secondary'],
      default: ['border border-button']
    },
    size: {
      small: ['text-xs', 'h-7', 'px-2 rounded'],
      medium: ['text-sm h-8 px-3 rounded'],
      large: ['text-base', 'h-12', 'px-4 rounded-lg font-medium']
    },
    /** outline */
    outline: {
      true: ['!bg-transparent border border-current']
    }
  },
  compoundVariants: [
    { type: 'primary', outline: true, class: '!text-primary' },
    { type: 'secondary', outline: true, class: '!text-secondary' }
  ],
  defaultVariants: {
    type: 'default',
    size: 'medium'
  }
});

export interface ButtonProps
  extends ButtonBaseProps,
    Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  style?: any;
  class?: any;
  classList?: any;
  /**
   * @description loading 状态
   * @type debounce | 当onClick为异步事件时，开启防抖
   */
  loading?: boolean | 'debounce';
  block?: boolean;
  children?: string | JSX.Element;
  onClick?: (val: any) => void;
}

export function Button(props: ButtonProps) {
  const [innerLoading, setInnerLoading] = createSignal(false);
  const [local, rest] = splitProps(props, [
    'children',
    'type',
    'size',
    'outline',
    'class',
    'loading',
    'onClick'
  ]);

  createEffect(() => {
    if (local.loading && local.loading !== 'debounce') {
      setInnerLoading(local.loading);
    } else {
      setInnerLoading(false);
    }
  });

  async function handleClick(e) {
    if (!local.onClick || innerLoading()) return;
    if (isPromise(local.onClick)) {
      try {
        if (local.loading === 'debounce') {
          setInnerLoading(true);
          await local.onClick(e);
          setInnerLoading(false);
        }
      } catch (e) {
        setInnerLoading(false);
        throw e;
      }
    } else {
      local.onClick(e);
    }
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      class={clsx(
        button({
          type: local.type,
          size: local.size,
          outline: local.outline,
          class: local.class
        }),
        innerLoading() ? 'pointer-events-none' : ''
      )}
      {...rest}
    >
      <Show when={typeof local.children !== 'string' || innerLoading()} fallback={local.children}>
        <div class="flex items-center justify-center space-x-1">
          <Show when={innerLoading()}>
            <Loading />
          </Show>
          <span>{local.children}</span>
        </div>
      </Show>
    </button>
  );
}
