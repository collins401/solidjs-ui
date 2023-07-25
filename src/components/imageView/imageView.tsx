import { createEffect, createSignal, For, mergeProps } from 'solid-js';
import { Mask } from '../mask';
export interface ImageViewProps {
  imgs: string[];
  defaultIndex?: number;
}
export function ImageView(props: ImageViewProps) {
  const [visible, setVisible] = createSignal(false);
  const mainProps = mergeProps({ imgs: [], defaultIndex: 0 }, props);
  return (
    <Mask open={visible()} onClose={() => setVisible(false)}>
      <div class="h-[calc(100vh-50px)] z-[1001] relative">
        <div
          style={{ display: '-webkit-box' }}
          class=" top-[45%] absolute translate-y-[-50%] w-[100vw] scrollbar-hide  overflow-auto scroll-snap-type-x"
        >
          <For each={mainProps.imgs}>
            {(img) => (
              <div class="snap-center">
                <img src={img} class="object-cover w-[100vw]" />
              </div>
            )}
          </For>
        </div>
      </div>
    </Mask>
  );
}
