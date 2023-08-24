import { mergeProps, JSX, createEffect } from 'solid-js';
import { css } from 'solid-styled-components';
import { SafeArea, useConfigProvider } from '@/components';

interface SubmitBarProps {
  fixed?: boolean;
  children: JSX.Element;
}
export function SubmitBar(props: SubmitBarProps) {
  const mianProps = mergeProps({ fixed: true }, props);
  const { theme } = useConfigProvider();
  let bar: any;
  let placeholder: any;
  createEffect(() => {
    console.log(bar.offsetHeight);
    if (mianProps.fixed) {
      placeholder.style.height = bar.offsetHeight + 'px';
    }
  });
  return (
    <>
      <div
        ref={bar}
        class={`${theme.classPrefix}-submit-bar ${css`
          position: ${mianProps.fixed ? 'fixed' : 'relative'};
          width: 100%;
          left: 0;
          bottom: 0;
          box-shadow: 0px -1px 8px rgba(0, 0, 0, 0.06);
        `}`}
      >
        <div class="bg-white">{props.children}</div>
        <SafeArea />
      </div>
      {mianProps.fixed && <div ref={placeholder} />}
    </>
  );
}
