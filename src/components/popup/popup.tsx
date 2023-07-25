import { createEffect, createMemo, createSignal, JSX, Show, mergeProps } from 'solid-js';

import { Transition } from 'solid-transition-group';
import { css } from 'solid-styled-components';
import { SafeArea, useConfigProvider } from '@/components';
import { Mask } from '../mask';
export interface PopupProps {
  position?: 'left' | 'right' | 'top' | 'bottom' | 'center';
  open: boolean;
  onClose?: (data: any) => void;
  children: JSX.Element;
  closeOnMaskClick?: boolean;
  style?: any;
  class?: any;
}

const positionObj = {
  center: 'fade',
  left: 'fade-left',
  right: 'fade-right',
  bottom: 'fade-bottom',
  top: 'fade-top'
};
export function Popup(props: PopupProps) {
  const [visible, setVisible] = createSignal(props.open);
  const mainProps = mergeProps({ closeOnMaskClick: true }, props);
  const { theme } = useConfigProvider();
  const position = createMemo(() => {
    const fadeNames = positionObj[mainProps.position] || `fade-${mainProps.position}`;
    return fadeNames;
  });

  createEffect(() => {
    setVisible(mainProps.open);
  });
  function handlerOutSide() {
    mainProps.onClose(false);
    setVisible(false);
  }
  createEffect(() => {
    const main = document.querySelector('#picker');
    const scrollEvent = () => {
      console.log(main.scrollTop);
    };
    main?.addEventListener('scroll', scrollEvent);
    main?.addEventListener('snapchanged', (event) => {
      console.info(event);
    });
  });

  return (
    <Mask open={visible()} onClose={handlerOutSide} closeOnMaskClick={mainProps.closeOnMaskClick}>
      <Transition name={position()}>
        <Show when={visible()}>
          <div
            id="picker"
            classList={{ 'bg-white': true }}
            class={`${theme.classPrefix}-popup-${mainProps.position || 'custom'} ${css`
              position: fixed;
              overflow: auto;
              left: ${mainProps.position === 'right' ? 'initial' : '0'};
              right: ${mainProps.position === 'left' ? 'initial' : '0'};
              bottom: ${mainProps.position === 'top' ? 'initial' : '0'};
              top: ${mainProps.position === 'bottom' ? 'initial' : '0'};
              height: ${mainProps.position === 'left' ? '100%' : 'auto'};
              margin: ${mainProps.position === 'center' ? 'auto' : 'inherit'};
              z-index: calc(${theme.maskZIndex} + 1);
            `} ${mainProps.class || ''}`}
            style={{ ...mainProps.style }}
          >
            {props.children}
            <SafeArea />
          </div>
        </Show>
      </Transition>
    </Mask>
  );
}
