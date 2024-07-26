import type { JSX } from 'solid-js';
import { createEffect, createSignal, mergeProps, Show, onCleanup } from 'solid-js';
import { Mask, Loading } from '@/components';
import { styled } from 'solid-styled-components';
import { Transition } from 'solid-transition-group';
import { useConfigProvider } from '../config-provider';
import { isPromise } from '@/components/utils';
export interface DialogProps {
  open?: boolean;
  closeOnMaskClick?: boolean;
  onClose?: (c?: any) => void;
  onOk?: (o?: any) => void;
  onCancel?: (o?: any) => void;
  title?: JSX.Element | string;
  okButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  footer?: JSX.Element;
  children?: JSX.Element;
  content?: JSX.Element;
  class?: any;
  style?: any;
  ref?: any;
}

const DialogStyle = styled.div((props) => ({
  position: 'fixed',
  top: '45%',
  width: '80vw',
  maxHeight: '80vh',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  transformOrigin: 'center center',
  paddingTop: '20px',
  borderRadius: '6px',
  overflow: 'hidden',
  zIndex: 1001
}));

const defaultProps: DialogProps = {
  title: '提示',
  closeOnMaskClick: false,
  okButtonText: '确认',
  cancelButtonText: '取消',
  showCancelButton: true,
  onClose: () => {}
};
export function Dialog(props: DialogProps) {
  const [visible, setVisible] = createSignal(props.open);
  const [innerLoading, setInnerLoading] = createSignal(false);
  const config = useConfigProvider();
  let payloadRef: any;
  let mainProps: any = mergeProps(defaultProps, props);
  createEffect(() => {
    setVisible(props.open);
    if (mainProps.open) {
      setInnerLoading(false);
    }
  });

  function show(payload: any) {
    payloadRef = payload;
    mainProps = mergeProps(defaultProps, payload);
    setVisible(true);
  }

  function cancel(e: HTMLDivElement, type?: string) {
    if (innerLoading()) return;
    mainProps.onClose(e, false);
    setVisible(false);
    if (type === 'cancel') {
      mainProps.onCancel?.(e);
    }
  }
  async function confirm() {
    if (!mainProps.onOk) return;
    if (isPromise(mainProps.onOk)) {
      try {
        setInnerLoading(true);
        await mainProps.onOk();
        if (payloadRef?.content) {
          setVisible(false);
        }
        setInnerLoading(false);
      } catch (e) {
        setInnerLoading(false);
        throw e;
      }
    } else {
      mainProps.onOk();
      setVisible(false);
    }
  }
  mainProps.ref?.({
    show: show
  });
  return (
    <Mask open={visible()} onClose={(e) => cancel(e)} closeOnMaskClick={mainProps.closeOnMaskClick}>
      <Transition name="fade-scale">
        <Show when={visible()}>
          <DialogStyle
            class={`${config?.theme.classPrefix}-dialog bg-white dark:bg-black ${mainProps.class || ''}`}
            style={mainProps.style}
          >
            <Show when={mainProps.title}>
              <div class="px-5 pb-2 text-center text-base font-medium">{mainProps.title}</div>
            </Show>
            <div
              class="p-5 pt-0 text-color/60 text-center"
              classList={{ 'pt-5px': !mainProps.title }}
            >
              {mainProps.children || mainProps.content}
            </div>
            <Show
              when={mainProps.footer}
              fallback={
                <div class="flex items-center text-center leading-[45px] border-t-[0.5px] text-base">
                  <Show when={mainProps.showCancelButton}>
                    <div
                      class="flex-1 text-color/60 border-r-[0.5px] active:bg-active"
                      on:click={(e) => cancel(e, 'cancel')}
                    >
                      {mainProps.cancelButtonText}
                    </div>
                  </Show>
                  <div
                    class="flex-1 h-[45px] font-medium active:bg-active flex items-center justify-center text-primary"
                    classList={{ 'pointer-events-none': innerLoading() }}
                    on:click={confirm}
                  >
                    <Show when={innerLoading()} fallback={mainProps.okButtonText}>
                      <Loading size={16} />
                    </Show>
                  </div>
                </div>
              }
            >
              {mainProps.footer}
            </Show>
          </DialogStyle>
        </Show>
      </Transition>
    </Mask>
  );
}
