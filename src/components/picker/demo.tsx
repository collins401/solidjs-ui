import { createSignal } from 'solid-js';
import { Button } from '../button';
import { Picker, PickerStyled } from './picker';
import { PickerSolt } from './picker-slot';
import { useToggle } from '../utils/useToggle';

const jsLib = [
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Qwit', label: 'Qwit' },
  { value: 'React', label: 'React' },
  { value: 'Vue.js', label: 'Vue.js' },
  { value: 'Alpine.js', label: 'Alpine.js' },
  { value: 'Preact', label: 'Preact' },
  { value: 'Lit', label: 'Lit' }
];
const jsTool = [
  { value: 'vite', label: 'vite' },
  { value: 'webpack', label: 'webpack' },
  { value: 'turbpack', label: 'turbpack' },
  { value: 'umijs', label: 'umijs' },
  { value: 'gulp', label: 'gulp' },
  { value: 'grunt', label: 'grunt' }
];

export default function PickerDemo() {
  const [visible, toggle] = useToggle(false);
  const [visible2, toggle2] = useToggle(false);
  const [js, setJs] = createSignal([]);
  const [cli, setCli] = createSignal([]);

  function onConfirm(e) {
    console.log(e);

    if (visible()) {
      setJs(e);
      toggle(false);
    } else {
      setCli(e);
      toggle2(false);
    }
  }
  return (
    <div class="m-5">
      <PickerStyled class="bg-color">
        <PickerSolt columns={jsLib} value="周5" />
      </PickerStyled>
      <PickerStyled class="bg-color mt-3 flex justify-center items-center">
        <PickerSolt columns={jsTool} />
        <PickerSolt columns={jsLib} />
      </PickerStyled>
      <div class="text-color/60 my-3">基础用法</div>
      <Button color="primary" onClick={toggle}>
        选择Js框架
      </Button>
      {js()}
      <div class="mt-2" />
      <Button color="primary" onClick={toggle2}>
        选择web应用框架
      </Button>
      {cli()[0]}-{cli()[1]}
      <Picker
        title="我是标题"
        columns={[jsLib]}
        open={visible()}
        value={js()}
        onConfirm={onConfirm}
        onClose={() => toggle(false)}
      />
      <Picker
        title="我是标题"
        columns={[jsTool, jsLib]}
        value={cli()}
        open={visible2()}
        onConfirm={onConfirm}
        onClose={() => toggle2(false)}
      />
    </div>
  );
}
