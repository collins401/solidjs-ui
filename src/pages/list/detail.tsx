import { createEffect, createResource, createSignal, JSX, onCleanup, Show } from 'solid-js';
import { useParams, useNavigate } from '@solidjs/router';
import { Navbar, Loading, SubmitBar, Button } from '@/components';
import { cnodeTopicsDetail } from '@/services/app';
import LockMaskScroll from '@/components/utils/use-lock-scroll';

interface RecordTypes {
  title?: string;
  content?: string;
}
export default function DetailPage() {
  const { beforeClose } = LockMaskScroll();
  const pageParams = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = createSignal<RecordTypes>();
  const [data] = createResource(pageParams.id, cnodeTopicsDetail);

  createEffect(() => {
    // LockMaskScroll.afterOpen();
    if (data()) {
      setDetail(data().data.data);
    }
  });
  onCleanup(() => beforeClose());
  return (
    <div class="fixed top-0 left-0 bottom-0 w-full bg overflow-auto">
      <Navbar title="长列表-详情" />
      <Show
        when={detail()}
        fallback={
          <div class="text-center p-2 text-primary">
            <Loading size={26} />
          </div>
        }
      >
        <div class="my-2.5 py-4 px-4 bg-white rounded">
          <h3>{detail()?.title}</h3>
          <div class="border-t-[1px] mt-3 pt-2 break-all" textContent={detail()?.content} />
        </div>
        <SubmitBar>
          <div class="p-4 flex justify-center items-center space-x-[10px]">
            <Button size="large" class="flex-1 text-16px" onClick={() => navigate(-1)}>
              返回
            </Button>
            <Button
              type="primary"
              size="large"
              class="flex-1 text-16px"
              onClick={() => navigate('/cnode', { replace: true })}
            >
              返回刷新列表
            </Button>
          </div>
        </SubmitBar>
      </Show>
    </div>
  );
}
