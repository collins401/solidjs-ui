import { Button } from './index';
export default function InputDemo() {
  return (
    <div class="py-3">
      <div class="text-color/60 mb-1 mx-5">Basic</div>
      <div class="bg-color flex flex-wrap py-3 px-5 gap-1">
        <Button type="primary">主题按钮</Button>
        <Button type="secondary">次要按钮</Button>

        <Button>默认按钮</Button>

        <Button class="bg-blue-500 text-white">自定义颜色</Button>
      </div>
      <div class="text-color/60 mb-1 mx-5">Outline</div>
      <div class="bg-color flex flex-wrap py-3 px-5 gap-1">
        <Button outline type="primary">
          主题线框
        </Button>
        <Button outline type="secondary">
          次要线框
        </Button>
        <Button outline class="text-amber-500">
          自定义线框
        </Button>
      </div>
      <div class="text-color/60 mb-1 mx-5">Light</div>
      <div class="bg-color flex flex-wrap py-3 px-5 gap-1">
        <Button type="primary" class="!bg-primary/20 !text-primary">
          主题背景
        </Button>
        <Button type="secondary" class="!bg-secondary/20 !text-secondary">
          次要背景
        </Button>
        <Button type="primary" class="!bg-blue-500/20 !text-blue-500">
          蓝色背景
        </Button>
        <Button type="primary" class="!bg-purple-500/20 !text-purple-500">
          紫色背景
        </Button>
      </div>
      <div class="text-color/60 mt-3 mb-1 mx-5">Disabled</div>
      <div class="bg-color py-3 px-5 space-x-[3px]">
        <Button disabled type="primary">
          主题禁用
        </Button>
        <Button disabled type="secondary">
          secondary禁用
        </Button>
        <Button disabled>默认禁用</Button>
      </div>
      <div class="text-color/60 mb-1 mx-5 mt-5">Custom size style rounded</div>
      <div class="bg-color p-5">
        <div class="space-x-1">
          <Button type="primary" size="small">
            小按钮
          </Button>
          <Button type="primary">默认按钮</Button>
          <Button type="primary" size="large">
            大按钮
          </Button>
          <Button class="bg-yellow-600 text-white  !h-14 rounded-lg text-lg">
            自定义大小 h-14
          </Button>
        </div>
        <div class="mt-2 space-y-[5px]">
          <Button type="primary" class="text-lg rounded-full !h-16 w-full">
            !h-16 w-full rounded-full text-lg
          </Button>
        </div>
      </div>
      <div class="text-color/60 mb-1 mx-5 mt-5">Loading</div>
      <div class="bg-color p-5 space-x-[5px]">
        <Button type="primary" loading />
        <Button type="primary" loading disabled>
          disabled
        </Button>
        <Button type="secondary" loading>
          加载中...
        </Button>
      </div>
      <div class="text-color/60 mb-1 mx-5 mt-5">Debounce</div>
      <div class="bg-color p-5 space-x-[5px]">
        <Button
          type="primary"
          loading="debounce"
          onClick={async () => {
            console.log('click');
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(true);
              }, 3000);
            });
          }}
        >
          异步防抖
        </Button>
      </div>
      <div class="text-color/60 mb-1 mx-5 mt-5">Beautiful</div>
      <div class="bg-color p-5 space-x-[5px]">
        <Button class="!border-[red] border-dashed text-[red]" plain>
          虚线边框
        </Button>
        <Button type="primary" class="bg-gradient-to-r from-[#ff0000] to-[#7367F0] text-white">
          渐变按钮
        </Button>
      </div>
    </div>
  );
}
