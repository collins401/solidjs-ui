import { createSignal, For } from 'solid-js';
import { InfiniteScroll } from './infiniteScroll';
const arr = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];
export default function infiniteScrollDemo() {
  const [list, setList] = createSignal([]);
  const [hasMore, setHasMore] = createSignal(true);

  async function loadmore() {
    console.log('loadmoreee');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const arrs = [...list(), ...arr];
        setList(arrs);
        if (arrs.length > 50) {
          setHasMore(false);
        }
        resolve(true);
      }, 3000);
    });
  }
  return (
    <>
      <div class="bg-white mt-4">
        <For each={list()}>{(i) => <div class="border-b py-4">{i}</div>}</For>
      </div>
      <InfiniteScroll loadMore={loadmore} hasMore={hasMore()} />
    </>
  );
}
