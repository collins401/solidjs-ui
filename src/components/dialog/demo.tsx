import { createSignal, onCleanup } from 'solid-js';
import { Button } from '../button';
import { Toast } from '../toast';
import { Dialog } from './index';
import { useToggle } from '../utils/useToggle';
let timer: any = null;

export default function toastDemo() {
  const [visible, toggle] = useToggle();
  const [visible3, setVisible3] = createSignal(false);
  const [visible4, setVisible4] = createSignal(false);
  const [showCancelButton] = createSignal(true);
  const [title] = createSignal('');
  const [second, setSecond] = createSignal(10);
  const [okButtonText] = createSignal<string>('确认');

  let dialogRef;
  function open1() {
    dialogRef.show({
      content: '万物皆可GPT',
      onOk: (v) => {
        console.log('ok', v);
        Toast.show('你点击了确认');
      },
      onCancel() {
        console.log('onCancel');
      }
    });
  }
  function open2() {
    dialogRef.show({
      content: '万物皆可GPT',
      title: '',
      onOk: (v) => {
        console.log('ok', v);
        Toast.show('你点击了确认');
      }
    });
  }
  function open3() {
    dialogRef.show({
      content: '万物皆可GPT',
      title: '提示',
      showCancelButton: false,
      okButtonText: '知道了',
      onOk: (v) => {
        console.log('ok', v);
      }
    });
  }
  function open4() {
    dialogRef.show({
      content: '万物皆可GPT',
      title: '提示',
      onOk: async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
            toggle();
            Toast.show('关闭成功');
          }, 3000);
        });
      }
    });
  }

  async function onOk() {
    if (title() === '提示4') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
          toggle();
          Toast.show('关闭成功');
        }, 3000);
      });
    } else {
      if (showCancelButton()) {
        Toast.show('你点击了确定');
      }
      toggle();
    }
  }

  function open5() {
    setVisible3(true);
  }

  onCleanup(() => clearInterval(timer));

  function open6() {
    setVisible4(true);
    timer = setInterval(() => {
      if (second() === 1) {
        setVisible4(false);
        setSecond(10);
        clearInterval(timer);
      } else {
        setSecond(second() - 1);
      }
    }, 1000);
  }
  function alert() {
    console.log(dialogRef);
    dialogRef.show({
      title: '提示',
      content: '万物皆可GPT',
      okButtonText: '知道了',
      showCancelButton: false,
      onOk() {
        console.log('ok');
      }
    });
  }
  function confirm() {
    dialogRef.show({
      title: '提示',
      content: '未认证的车辆，请去认证',
      async onOk() {
        console.log('ok');
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 2000);
        });
      }
    });
  }

  return (
    <div class="m-5">
      <div class="text-color/60 mb-1">基础用法</div>
      <div class="bg-color rounded">
        <div class="active:bg-active" on:click={open1}>
          <div class="p-3 pl-0 ml-5 border-b-[0.5px]">提示弹窗</div>
        </div>
        <div class="active:bg-active" on:click={open2}>
          <div class="p-3 pl-0 ml-5 border-b-[0.5px]">提示弹窗（无标题）</div>
        </div>
        <div class="active:bg-active" on:click={open3}>
          <div class="p-3 pl-0 ml-5 border-b-[0.5px]">提示弹窗（无取消按钮）</div>
        </div>
        <div class="active:bg-active" on:click={() => open4()}>
          <div class="p-3 pl-0 ml-5 ">异步关闭（防止重复点击）</div>
        </div>
      </div>
      <div class="text-color/60 mb-1 mt-4">高级用法（JSX）</div>
      <div class="bg-color  rounded">
        <div class="active:bg-active" on:click={open5}>
          <div class="p-3 pl-0 ml-5 border-b-[0.5px]">弹窗定制化</div>
        </div>
        <div class="active:bg-active" on:click={open6}>
          <div class="p-3 pl-0 ml-5">倒计时关闭</div>
        </div>
      </div>
      <div class="text-color/60 mb-1 mt-4">函数式调用</div>
      <div class="bg-color  rounded">
        <div class="active:bg-active" on:click={alert}>
          <div class="p-3 pl-0 ml-5 border-b-[0.5px]">Dialog.alert</div>
        </div>
        <div class="active:bg-active" on:click={confirm}>
          <div class="p-3 pl-0 ml-5">Dialog.confirm</div>
        </div>
      </div>
      <Dialog
        open={visible()}
        title={title()}
        ref={dialogRef!}
        showCancelButton={showCancelButton()}
        onOk={onOk}
        okButtonText={okButtonText()}
        onClose={() => toggle(false)}
      >
        <div>不要老想着你没有的和已有的东西，而要想着你认为最好的东西</div>
      </Dialog>
      <Dialog
        open={visible3()}
        okButtonText={okButtonText()}
        class="w-[90vw]"
        title={<span class="text-primary">Solidjs UI</span>}
        onClose={() => setVisible3(false)}
        footer={
          <div class="m-4 mt-0">
            <Button
              type="primary"
              class="!rounded-full w-full h-[42px]"
              onClick={() => {
                console.log('setVisible3');
                setVisible3(false);
              }}
            >
              Nice Cool~~
            </Button>
          </div>
        }
      >
        <div class="text-[#4f88c6]">
          一个用于构建用户界面，简单高效、性能卓越的JavaScript库，可组合的响应式原语与 JSX
          的灵活性相结合
        </div>
      </Dialog>
      <Dialog open={visible4()} okButtonText="知道了" title="提交成功" showCancelButton={false}>
        <div>{second()}秒后自动关闭</div>
      </Dialog>
    </div>
  );
}
