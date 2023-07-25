import { For } from 'solid-js';
import { Outlet, useNavigate } from '@solidjs/router';

export default function DemoPage() {
  const navigate = useNavigate();
  function jump(page: string) {
    navigate(page);
  }
  const pageRoutes = [
    { id: 'config-provider', name: '全局配置' },
    { id: 'button', name: '按钮' },
    { id: 'input', name: '输入框' },
    { id: 'checkbox', name: '多选' },
    { id: 'radio', name: '单选' },
    { id: 'switch', name: '切换' },
    { id: 'toast', name: '吐司' },
    { id: 'dialog', name: '对话框' },
    { id: 'popup', name: '弹窗' },
    { id: 'picker', name: '选择器(纯css实现)' },
    { id: 'picker2', name: '选择器' },
    // { id: 'dropdown', name: '下拉菜单' },
    { id: 'calendar', name: '日历' },
    { id: 'infiniteScroll', name: '加载更多' },
    { id: 'imageView', name: '图片预览' },
    { id: 'swipe', name: '滑块' }
  ];
  return (
    <>
      <div class="m-4 bg-white rounded">
        <For each={pageRoutes}>
          {(page, i) => (
            <div class="active:bg-active/80" on:click={() => jump(page.id)}>
              <div class="mx-3 py-3 " classList={{ 'border-t': i() !== 0 }}>
                <span class="capitalize">
                  {page.id} {page.name}
                </span>
              </div>
            </div>
          )}
        </For>
      </div>
    </>
  );
}
