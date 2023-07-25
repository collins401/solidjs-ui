import { Picker2 } from './picker';
import { useToggle } from '../utils/useToggle';
import { createSignal } from 'solid-js';
import { SvgIcon } from '../svgIcon';
const jsLib = [
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Qwit', label: 'Qwit' },
  { value: 'React', label: 'ReactReactReactReactReactReactReactReact' },
  { value: 'Vue.js', label: 'Vue.js' },
  { value: 'Alpine.js', label: 'Alpine.js' },
  { value: 'Preact', label: 'Preact' },
  { value: 'Lit', label: 'Lit' }
];
const jsTool = [
  { value: 'vite', label: 'vite' },
  { value: 'webpack', label: 'webpack' },
  { value: 'turbpack', label: 'turbpack' },
  { value: 'gulp', label: 'gulp' },
  { value: 'grunt', label: 'grunt' }
];

export default function PickerSlot2Demo() {
  const [visible, toggle] = useToggle(false);
  const [value1, setValue1] = createSignal('');
  const [value2, setValue2] = createSignal('');
  const [value3, setValue3] = createSignal([]);
  const [javascript, setJavascript] = createSignal([]);
  const [curId, setCurId] = createSignal(0);

  // const jsTool = ['vite', 'webpack', 'turbpack', 'gulp', 'grunt']

  function open(id: number) {
    setCurId(id);
    if (id === 1) {
      setJavascript([jsTool]);
    } else if (id === 2) {
      setJavascript([jsLib]);
    } else {
      setJavascript([jsTool, jsLib]);
    }
    toggle(true);
  }

  function confirmFn(e) {
    console.log(e);
    toggle(false);
    if (curId() === 1) {
      setValue1(e[0]);
    } else if (curId() === 2) {
      setValue2(e[0]);
    } else {
      setValue3(e);
    }
  }
  return (
    <div class="m-5">
      <div class="text-color/60 mb-1">基础用法</div>
      <div class="bg-white rounded">
        <div class="border-b active:bg-active">
          <div class="flex-between p-3" on:click={() => open(1)}>
            <div>选择构建工具</div>
            <div>
              {value1()}
              {!value1() && <span class="text-color/30">请选择</span>}
              <SvgIcon size="12px" type="back" class="transform rotate-180 " />
            </div>
          </div>
        </div>
        <div class="border-b active:bg-active">
          <div class="flex-between p-3" on:click={() => open(2)}>
            <div>选择js框架</div>
            <div>
              <span>{value2()}</span>
              {!value2() && <span class="text-color/30">请选择</span>}
              <SvgIcon size="12px" type="back" class="transform rotate-180 " />
            </div>
          </div>
        </div>
        <div class="active:bg-active">
          <div class="flex-between p-3" on:click={() => open(3)}>
            <div>配置脚手架</div>
            <div>
              <span>{value3().toString()}</span>
              {value3().length === 0 && <span class="text-color/30">请选择</span>}
              <SvgIcon size="12px" type="back" class="transform rotate-180 " />
            </div>
          </div>
        </div>
      </div>
      <Picker2
        onClose={() => toggle(false)}
        open={visible()}
        value={[]}
        options={javascript()}
        onConfirm={(e) => confirmFn(e)}
      />
    </div>
  );
}
