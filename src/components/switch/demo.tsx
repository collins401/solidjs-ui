import useDark from '@/hooks/useDark';
import { createSignal } from 'solid-js';
import { Switch } from './index';
export default function SwitchDemo() {
  const [checked, setChecked] = createSignal(true);
  const [dark, toggle] = useDark();

  async function beforChange() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  }
  return (
    <div class="my-5">
      <div class="text-color/60 mb-1 mx-5">基础用法</div>
      <div class="bg-white py-3 px-5">
        <Switch />
        <Switch disabled checked={true} />
      </div>
      <div class="text-color/60 mb-1 mx-5 mt-5">有默认值</div>
      <div class="bg-white p-5">
        <Switch checked={checked()} onChange={(e) => setChecked(e)} />{' '}
        <span>-{checked() ? 'true' : 'off'}</span>
      </div>
      <div class="text-color/60 mb-1 mx-5 mt-5">自定义文字、图案</div>
      <div class="bg-white p-5">
        <Switch checkedText="开" uncheckedText="关" />
        <Switch
          checked={checked()}
          class="w-[120px]"
          checkedText="开-文案有点长"
          uncheckedText="开-文案有点长"
        />
        <div class="mt-2">
          <Switch
            checkedText={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-sun"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#fff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="4" />
                <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
              </svg>
            }
            checked={dark()}
            uncheckedText={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-moon-stars"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#868e96"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                <path d="M19 11h2m-1 -1v2" />
              </svg>
            }
            onChange={toggle}
          />
        </div>
      </div>
      <div class="text-color/60 mb-1 mx-5 mt-5">异步控制</div>
      <div class="bg-white p-5 space-y-5px">
        <Switch checkedText="开" uncheckedText="关" size={32} beforeChange={beforChange} />
        <Switch checkedText="ON" checked uncheckedText="OFF" size={32} beforeChange={beforChange} />
      </div>
      <div class="text-color/60 mb-1 mx-5 mt-5">自定义颜色、大小</div>
      <div class="bg-white p-5 space-y-5px">
        <div>
          <Switch
            activeColor="#ee0a24"
            checked={true}
            size={22}
            checkedText="22"
            uncheckedText="22px"
          />
        </div>
        <div>
          <Switch activeColor="#07c160" size={32} checkedText="32" uncheckedText="32px" />
        </div>
        <div>
          <Switch
            activeColor="green"
            checked={true}
            size={45}
            checkedText="45px"
            class="w-[100px]"
            uncheckedText="45px"
          />
        </div>
      </div>
    </div>
  );
}
