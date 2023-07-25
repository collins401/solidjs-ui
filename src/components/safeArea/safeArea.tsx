import { mergeProps, Show } from 'solid-js';
import { css } from 'solid-styled-components';
interface SafeAreaProps {
  position?: 'bottom' | 'top';
  multiple?: number;
}

export function SafeArea(props: SafeAreaProps) {
  const mainProps = mergeProps({ position: 'bottom', multiple: 0.8 }, props);
  return (
    <Show
      when={mainProps.position === 'top'}
      fallback={
        <div
          class={css`
            padding-bottom: calc(constant(safe-area-inset-bottom) * ${mainProps.multiple});
            padding-bottom: calc(env(safe-area-inset-bottom) * ${mainProps.multiple});
          `}
        />
      }
    >
      <div
        class={css`
          padding-top: constant(safe-area-inset-top);
          padding-top: env(safe-area-inset-top);
        `}
      />
    </Show>
  );
}
