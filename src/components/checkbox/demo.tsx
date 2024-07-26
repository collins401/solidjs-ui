import { For, createSignal } from 'solid-js';
import { Checkbox, CheckboxGroup } from './index';

const options = [
  { value: 'apple', label: '苹果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橙子' },
  { value: 'pineapple', label: '菠萝' }
];
export default function CheckboxDemo() {
  const [checked, setChecked] = createSignal(['orange']);
  return (
    <div class="my-5">
      <div class="text-color/60 mb-1 mx-5">基础用法</div>
      <div class="bg-color py-3 px-5">
        <Checkbox>自定义文案</Checkbox>
        <Checkbox indeterminate={true}>半选状态</Checkbox>
        <Checkbox checked={true} disabled>
          禁止点击
        </Checkbox>
      </div>
      <div class="text-color/60 mb-1 mx-5 mt-5">有默认值</div>
      <div class="bg-color p-5">
        <CheckboxGroup
          class="flex space-x-2.5"
          value={checked()}
          options={options}
          onChange={(e) => setChecked(e)}
        />
        <div class="h-[20px]">{checked()?.toString()}</div>
      </div>

      <div class="text-color/60 mb-1 mx-5 mt-5">自定义颜色、大小</div>
      <div class="bg-color p-5 space-y-1">
        <div>
          <Checkbox class="!text-[20px]" checked={true}>
            20px
          </Checkbox>
          <Checkbox class="!text-[40px]" inputStyle={{ color: 'red' }} checked={true}>
            40px
          </Checkbox>
          <Checkbox class="!text-[60px] " checked={true}>
            60px
          </Checkbox>
        </div>
      </div>
      <div class="text-color/60 mb-1 mx-5 mt-5">组合使用</div>
      <CheckboxGroup class="" value={checked()} onChange={(e) => setChecked(e)}>
        <For each={options}>
          {(item) => (
            <div class="flex">
              <Checkbox value={item.value} />
              <div>{item.label}</div>
            </div>
          )}
        </For>
      </CheckboxGroup>
    </div>
  );
}
