import { Portal } from 'solid-js/web';
import { createEffect, createSignal, JSX, onCleanup, Show } from 'solid-js';
import { Transition } from 'solid-transition-group';
import LockMaskScroll from '../utils/use-lock-scroll';
import { themeStyle } from '../styles/theme.styles';

export interface MaskProps {
  open: boolean;
  children: JSX.Element;
  onClose: (e: boolean) => void;
  closeOnMaskClick?: boolean;
  style?: any;
}

export function Mask(props: MaskProps) {
  const { MaskStyle } = themeStyle();
  const [visible, setVisible] = createSignal(props.open);
  const { afterOpen, beforeClose } = LockMaskScroll();

  createEffect(() => {
    setVisible(props.open);
    if (props.open) {
      afterOpen();
    } else {
      beforeClose();
    }
  });

  onCleanup(() => beforeClose());

  const maskClose = (e) => {
    if (props.closeOnMaskClick) {
      handlerOutSide();
    }
  };

  function handlerOutSide() {
    props.onClose?.(false);
    setVisible(false);
  }
  return (
    <Portal>
      <Transition name="fade">
        <Show when={visible()}>
          <MaskStyle style={props?.style} on:click={maskClose} />
        </Show>
      </Transition>
      {props.children}
    </Portal>
  );
}
