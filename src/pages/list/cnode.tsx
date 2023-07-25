import { createResource, createSignal, For, Index } from 'solid-js';
import { useNavigate, Outlet } from '@solidjs/router';
import { Navbar, SafeArea } from '@/components';
import { cnodeTopics } from '@/services/app';
import LockMaskScroll from '@/components/utils/use-lock-scroll';

export default function List() {
  const { afterOpen } = LockMaskScroll();
  const navigate = useNavigate();
  const parmas = {
    page: 1,
    limit: 60,
    tab: 'good'
  };
  const [data, { mutate, refetch }] = createResource(parmas, cnodeTopics);
  console.log(data()?.data);

  function detail(id: string) {
    afterOpen();
    navigate('/detail/' + id);
  }
  return (
    <>
      <Navbar title="长列表" />
      <div class="my-2.5 bg-white">
        <For each={data()?.data.data}>
          {(list, i) => (
            <div class="pl-3 active:bg-active" on:click={() => detail(list.id)}>
              <div classList={{ 'border-t-[0.5px]': i() !== 0 }} class="border-t-[0.5px] p-3 pl-0">
                <span class="text-primary mr-2">•</span>
                {list.title}
              </div>
            </div>
          )}
        </For>
        <SafeArea />
      </div>
      <Outlet />
    </>
  );
}
