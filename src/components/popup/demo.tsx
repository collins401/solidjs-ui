import { createSignal, Index } from 'solid-js';
import { Button } from '../button';
import { Popup, PopupProps } from './index';
import { Toast } from '../toast';
import IMG from '../../assets/images/img1.png';
import CLOSE from '../../assets/images/close.png';
import { SafeArea } from '../safeArea';

export default function PopupDemo() {
  const [visible, setVisible] = createSignal(false);
  const [visible2, setVisible2] = createSignal(false);
  const [visible3, setVisible3] = createSignal(false);
  const [position, setPosition] = createSignal<PopupProps['position']>('bottom');
  function open(pos: PopupProps['position']) {
    setPosition(pos);
    setVisible(true);
  }
  function open2() {
    setVisible2(true);
  }
  function handler(type) {
    Toast.show(`你选择了"选项${type}"`);
    setVisible2(false);
  }

  function open3() {
    setVisible3(true);
  }

  return (
    <div class="m-5">
      <div>基础弹窗</div>

      <div class="space-y-2">
        <Button type="primary" size="large" class="w-full" onClick={() => open('center')}>
          正中弹窗
        </Button>
        <Button type="primary" size="large" class="w-full" onClick={() => open('bottom')}>
          底部弹窗
        </Button>

        <Button type="primary" size="large" class="w-full" onClick={() => open('top')}>
          顶部弹窗
        </Button>

        <Button type="primary" size="large" class="w-full" onClick={() => open('right')}>
          右侧弹窗
        </Button>

        <Button type="primary" size="large" class="w-full" onClick={() => open('left')}>
          左侧弹窗
        </Button>
      </div>
      <div class="mt-5">基于Popup自定义内容实现</div>
      <Button type="primary" size="large" class="w-full" onClick={() => open2()}>
        打开ActionSheet
      </Button>

      <div class="mt-5">自定义图片</div>
      <Button type="primary" size="large" class="w-full" onClick={() => open3()}>
        打开活动弹窗
      </Button>

      <Popup
        position={position()}
        class={`${position() === 'center' ? '!w-[60vw] !h-[40vh]' : ''}`}
        open={visible()}
        onClose={() => setVisible(false)}
      >
        <div
          class="relative"
          classList={{
            'w-[200px]': position() === 'left' || position() === 'right'
          }}
        >
          <div class="py-[80px] h-[200px]">自定义填充内容</div>
        </div>
      </Popup>
      <Popup
        position="bottom"
        class="rounded-t-[4px]"
        open={visible2()}
        onClose={() => setVisible2(false)}
      >
        <div class="text-center text-bae leading-[42px]">
          <div>
            <div class="active:bg-active rounded-t-2" on:click={() => handler('一')}>
              选项一
            </div>
            <div class="border-t-[0.5px] active:bg-active" on:click={() => handler('二')}>
              选项二
            </div>
            <div class="border-t-[0.5px] text-color/30">选项三</div>
            <div class="border-t-[0.5px] active:bg-active" on:click={() => handler('四')}>
              选项四
            </div>
          </div>
          {/* <div class="h-[8px] bg" /> */}
          <div
            class="leading-[50px] border-t-[8px] text-color/60 active:bg-active"
            on:click={() => setVisible2()}
          >
            取消
          </div>
        </div>
      </Popup>
      <Popup
        position="center"
        class="!bg-transparent w-[280px] !h-[320px]"
        open={visible3()}
        closeOnMaskClick={false}
        onClose={() => setVisible3(false)}
      >
        <div class="text-center">
          <img src={IMG} alt="" />
          <img
            src={CLOSE}
            alt="CLOSE"
            class="w-[22px] mt-3 m-auto"
            on:click={() => setVisible3(false)}
          />
        </div>
      </Popup>
    </div>
  );
}
