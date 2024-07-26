import { Toast } from './index';
import { SvgIcon } from '@/components';

export default function toastDemo() {
  function handler() {
    Toast.show({
      message: '轻提示'
    });
  }
  function handlerLoadinng(type) {
    const txt = {
      loading: '加载中...',
      success: '提交成功',
      fail: '提交失败'
    };
    Toast.show({
      message: txt[type],
      icon: type
    });
  }

  function handlerToast() {
    Toast.show({
      message: '背景不可点击',
      closeOnMaskClick: true,
      duration: 10000
    });
  }
  function handlerIcon() {
    Toast.show({
      message: '自定义图标',
      icon: <SvgIcon type="scan" color="white" size="40px" />
    });
  }
  return (
    <>
      <div class="bg-color m-4 rounded px-4">
        <div class="border-b-[0.5px] p-3 pl-0" on:click={handler}>
          常规提示<span class="text-color/60 text-12px">（默认3秒）</span>
        </div>
        <div class="border-b-[0.5px] p-3 pl-0" on:click={() => handlerLoadinng('loading')}>
          加载中
        </div>
        <div class="border-b-[0.5px] p-3 pl-0" on:click={() => handlerLoadinng('success')}>
          成功提示
        </div>
        <div class="border-b-[0.5px] p-3 pl-0" on:click={() => handlerLoadinng('fail')}>
          失败提示
        </div>
        <div class="border-b-[0.5px] p-3 pl-0" on:click={() => handlerIcon()}>
          自定义图标
        </div>
        <div class="border-b-[0.5px] p-3 pl-0" on:click={() => handlerToast()}>
          背景不可点击<span class="text-color/60 text-12px">（10秒后关闭）</span>
        </div>
        <div class="p-3 pl-0" on:click={() => Toast.clear()}>
          手动关闭
        </div>
      </div>
    </>
  );
}
