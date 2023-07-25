import { createSignal, Show, createMemo, createEffect, mergeProps } from 'solid-js';
import type { JSX } from 'solid-js';
import { css, styled } from 'solid-styled-components';
import { SvgIcon, Loading } from '@/components';
export interface ToastProps {
  duration?: number;
  message?: string;
  icon?: 'success' | 'fail' | 'loading' | JSX.Element;
  maskClickable?: boolean;
}
const MaskStyled = styled.div((props) => ({
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 1020
}));
const MaskBox = styled.div((props: { style?: any }) => ({
  position: 'absolute',
  backgroundColor: 'rgba(0,0,0,.8)',
  width: 'auto',
  maxWidth: '320px',
  padding: '12px 16px',
  fontSize: '16px',
  borderRadius: '8px',
  zIndex: 1021,
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#fff',
  wordBreak: 'break-all',
  textAlign: 'center',
  ...props.style
}));
export function ToastInstance(props: ToastProps) {
  const defaultProps = {
    message: '',
    duration: 3000,
    closeOnMaskClick: false
  };
  const toastProps = mergeProps(defaultProps, props);

  const iconElement = createMemo(() => {
    if (!toastProps.icon) return null;
    if (toastProps.icon === 'loading') {
      return <Loading bgFill size={40} />;
    } else if (toastProps.icon === 'success') {
      return <SvgIcon type="success" color="#fff" size="40px" />;
    } else if (toastProps.icon === 'fail') {
      return <SvgIcon type="fail" color="#fff" size="40px" />;
    } else {
      return toastProps.icon;
    }
  });

  return (
    <div class={css``}>
      <Show when={toastProps.closeOnMaskClick}>
        <MaskStyled />
      </Show>
      <MaskBox
        class="flex-center"
        classList={{
          'p-5': !!toastProps.icon,
          '!w-[120px] !h-[120px]': !!toastProps.icon
        }}
      >
        <div>
          <Show when={toastProps.icon}>
            <div class="mb-2">{iconElement()}</div>
          </Show>
          {toastProps.message}
        </div>
      </MaskBox>
    </div>
  );
}
