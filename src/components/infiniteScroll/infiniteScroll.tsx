import { createEffect, onMount, JSX, Show, createSignal, mergeProps } from 'solid-js';
import { Loading } from '../loading';
import { useRect } from '../utils/useRect';
export interface InfiniteScrollProps {
  children?: JSX.Element;
  loadMore: () => Promise<unknown>;
  hasMore?: boolean;
  threshold?: number;
}
export function InfiniteScroll(props: InfiniteScrollProps) {
  let loadingRef: HTMLDivElement = null;
  let scrollParent: HTMLDivElement = null;
  const [hasMore, setHasMore] = createSignal(true);
  const [loading, setLoading] = createSignal(false);
  const mainProps = mergeProps({ threshold: 20 }, props);

  onMount(() => {
    window.addEventListener('scroll', onScroll);
    init();
  });

  createEffect(() => {
    setHasMore(mainProps.hasMore);
  });

  async function init() {
    if (loadingRef && hasMore()) {
      if (loading()) {
        return;
      }
      const elementTop = useRect(loadingRef).top;
      const current = window.innerHeight;
      if (current >= elementTop - mainProps.threshold) {
        console.log('111');
        setLoading(true);
        await props.loadMore?.();
        console.log('222');
        setLoading(false);
      }
    }
  }
  async function onScroll() {
    console.log('onScroll');
    init();
  }

  createEffect(() => {
    console.log(useRect(loadingRef).top);
  });
  return (
    <div ref={scrollParent}>
      {props.children}
      <Show
        when={hasMore()}
        fallback={<div class="text-color/60 py-3 text-center">--没有更多了--</div>}
      >
        <div ref={loadingRef} class="infinite-scroll text-center py-3">
          <Loading size={26} class="text-primary" />
        </div>
      </Show>
    </div>
  );
}
