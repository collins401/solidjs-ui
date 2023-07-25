import { createSignal } from 'solid-js';
import { Radio, RadioGroup } from './index';
export default function RadioDemo() {
  const options = [
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橙子' },
    { value: 'pineapple', label: '菠萝' }
  ];
  const [checked, setChecked] = createSignal('orange');
  return (
    <div class="my-5">
      <div class="text-color/60 mb-1 mx-5">基础用法</div>
      <div class="bg-white py-3 px-5">
        <Radio checked={false}>自定义文案</Radio>
        <Radio checked={true} disabled>
          禁止点击
        </Radio>
      </div>
      <div class="text-color/60 mb-1 mx-5 mt-5">有默认值</div>
      <div class="bg-white p-5">
        <RadioGroup
          class="flex space-x-2.5"
          value={checked()}
          options={options}
          onChange={(e) => setChecked(e)}
        />
        <div class="h-[20px]">{checked()?.toString()}</div>
      </div>

      <div class="text-color/60 mb-1 mx-5 mt-5">自定义颜色、大小</div>
      <div class="bg-white p-5 space-y-1">
        <div>
          <Radio class="text-[20px]" checked={true}>
            20px
          </Radio>
          <Radio class="text-[40px] " style={{ color: 'red' }} checked={true}>
            40px
          </Radio>
          <Radio class="text-[60px] " checked={true}>
            60px
          </Radio>
        </div>
      </div>
    </div>
  );
}
