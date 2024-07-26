import { createSignal } from 'solid-js';
import { Input } from '@/components';

export default function InputDemo() {
  const [value, setValue] = createSignal('兔年来了~');
  return (
    <div class="my-5">
      <p class="text-color/60 mb-1 pl-5">基础用法</p>
      <div class="bg-color pl-2">
        <Input placeholder="请输入内容" size={40} />
      </div>
      <p class="text-color/60 mb-1 mt-5 pl-5">输入右对齐</p>
      <div class="bg-color pl-2">
        <Input placeholder="请输入内容" class="text-right" size={40} maxLength={10} />
      </div>
      <p class="text-color/60 mb-1 mt-5 pl-5">光标颜色</p>
      <div class="bg-color pl-2">
        <Input placeholder="请输入内容" class="caret-primary" size={40} />
      </div>
      <p class="flex items-center justify-between text-color/60 mb-1 mt-5 px-5">
        受控模式
        {value().length > 10 && <span class="text-danger">长度超过10个字符</span>}
      </p>
      <div class="bg-color pl-2">
        <Input
          placeholder="请输入内容"
          value={value()}
          onChange={(e) => setValue(e)}
          class="caret-primary"
          size={46}
        />
      </div>
      <p class="text-color/60 mb-1 mt-5 pl-5">只读模式</p>
      <div class="bg-color pl-2">
        <Input
          placeholder="请输入内容"
          value="只读内容，不允许修改"
          readOnly
          class="caret-primary"
          size={40}
        />
      </div>
      <p class="text-color/60 mb-1 mt-5 pl-5">禁用模式</p>
      <div class="bg-color pl-2">
        <Input placeholder="请输入内容" value="禁止输入" disabled size={40} />
      </div>
    </div>
  );
}
