import {
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  JSX,
  Show,
  splitProps
} from 'solid-js';
import { styled } from 'solid-styled-components';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { useConfigProvider } from '../config-provider';
import { Loading } from '../loading';
import { sizeToNumber, isPromise } from '../utils';

export type SwitchBaseProps = VariantProps<typeof switchToggle>;
const switchToggle = cva('transition-all rounded-full p-[2px] text-md ', {
  variants: {
    checked: {
      true: ['bg-primary'],
      false: ['bg-gray-300']
    }
  },
  defaultVariants: {
    checked: false
  }
});

export interface SwitchProps {
  disabled?: boolean;
  checked?: boolean;
  size?: number;
  checkedText?: string | JSX.Element;
  uncheckedText?: string | JSX.Element;
  activeColor?: string;
  class?: any;
  onChange?: (val: boolean) => void;
  beforeChange?: () => void;
}

const SwitchBtn = styled('div')((props: any) => ({
  display: 'inline-block',
  'input[type="checkbox"]': {
    display: 'none'
  },
  verticalAlign: 'middle',
  label: {
    position: 'relative',
    height: '100%',
    padding: '0',
    transition: 'all .2s',
    verticalAlign: 'baseline'
  },
  'input:checked ~ label': {
    color: '#fff'
  },
  'input[disabled] ~ label': {
    opacity: 0.5,
    pointerEvents: 'none'
  }
}));
export function Switch(props: SwitchProps) {
  const [checked, setChecked] = createSignal(props.checked);
  const [innerLoading, setInnerLoading] = createSignal(false);
  const id = createUniqueId();
  const { theme } = useConfigProvider();
  const [local, rest] = splitProps({ size: 26, ...props }, [
    'size',
    'disabled',
    'checkedText',
    'uncheckedText',
    'activeColor',
    'class'
  ]);
  createEffect(() => {
    console.log('rest.checked', props.checked);
    setChecked(props.checked);
  });

  const HEIGHT = createMemo(() => {
    const size = sizeToNumber(local.size) || theme.defaultSwitchHeight;
    return size < 16 ? 16 : size;
  });

  const changeInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
    const target = event.target as HTMLInputElement;
    setChecked(target.checked);
    props.onChange?.(target.checked);
  };

  async function beforeChange(e: any) {
    if (!props.beforeChange) return;
    if (innerLoading()) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    if (isPromise(props.beforeChange)) {
      try {
        setInnerLoading(true);
        await props.beforeChange();
        setInnerLoading(false);
        setChecked(!checked());
        props.onChange?.(!checked());
      } catch {
        setInnerLoading(false);
        e.preventDefault();
      }
    } else {
      props.beforeChange();
    }
  }
  return (
    <SwitchBtn
      color={local.activeColor || theme.colorPrimary}
      role="switch"
      class={clsx(`${theme.classPrefix}-switch`, switchToggle({ checked: checked() }), local.class)}
      on:click={beforeChange}
      style={{ height: HEIGHT() + 'px' }}
    >
      <input
        id={id}
        type="checkbox"
        disabled={local.disabled}
        checked={checked()}
        onChange={changeInput}
      />
      <label
        for={id}
        class={`${theme.classPrefix}-switch--node min-w-[50px] relative flex items-center justify-between`}
      >
        <span
          class={clsx('inline-block flex-center !bg-white rounded-full absolute transition-all')}
          style={{
            left: checked() ? `calc(100% - ${HEIGHT() - 4}px)` : 0,
            height: HEIGHT() - 4 + 'px',
            width: HEIGHT() - 4 + 'px'
          }}
        >
          <Show when={innerLoading()}>
            <Loading style={{ color: '#4d4d4d' }} />
          </Show>
        </span>
        <span
          class={clsx(
            'transition-all whitespace-nowrap px-1',
            checked() ? 'text-white' : 'text-solidGray'
          )}
          style={{
            margin: checked() ? `0 ${HEIGHT()}px 0 0` : `0 0 0 ${HEIGHT() - 4}px`
          }}
        >
          {checked() ? local.checkedText : local.uncheckedText}
        </span>
      </label>
    </SwitchBtn>
  );
}
