import { mergeProps, Show } from 'solid-js';
import { css } from 'solid-styled-components';
interface SafeAreaProps {
  position?: 'bottom' | 'top';
}

export function SafeArea(props: SafeAreaProps) {
  const mainProps = mergeProps({ position: 'bottom' }, props);
  return (
    <Show
      when={mainProps.position === 'top'}
      fallback={
        <div
          class={css`
            padding-bottom: constant(safe-area-inset-bottom);
            padding-bottom: env(safe-area-inset-bottom);
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
