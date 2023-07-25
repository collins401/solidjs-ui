import { createEffect, createSignal, For } from 'solid-js';
import { useConfigProvider } from './config-provider';
import { Button } from '../button';
import { Switch } from '../switch';
import { MonthPanel } from '../calendar/monthPanel';
import { Checkbox } from '../checkbox';
import useDark from '@/hooks/useDark';

const themeColors = [
  { value: '#2eb872', label: '绿草' },
  { value: '#138cdc', label: '蓝鲸' },
  { value: '#5076BD', label: '企微' },
  { value: '#9519c2', label: '酱紫' },
  { value: '#d35917', label: '橙光' },
  { value: '#d41138', label: '红旗' }
];

const WEEK_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
export default function ConfigProviderDemo() {
  const [dark, toggle] = useDark();
  const { theme } = useConfigProvider();
  const [value, setValue] = createSignal('');

  createEffect(() => {
    const cache = localStorage.getItem('colorPrimary');
    setValue(cache);
  });

  function changeTheme(e) {
    localStorage.setItem('colorPrimary', e);
    setValue(e);
    window.location.reload();
  }

  return (
    <div class="m-3 ">
      <div class="bg-white px-1 py-4 rounded shadow">
        <div class="grid grid-cols-6">
          <For each={themeColors}>
            {(color) => (
              <Checkbox onChange={() => changeTheme(color.value)} checked={value() === color.value}>
                <span style={{ color: color.value }}>{color.label}</span>
              </Checkbox>
            )}
          </For>
        </div>
      </div>
      <div class="rounded-lg my-4 shadow text-white" style={{ background: theme.colorPrimary }}>
        <div class="h-[130px] relative overflow-hidden rounded-lg">
          <div class="w-8 h-8 rounded-full bg-white/60 absolute left-12 top-10 " />
          <div class="w-[280px] h-[280px] rounded-full bg-black/30 absolute -right-[140px] -top-[180px]" />
        </div>
        <div class="p-4 -mt-12">
          <div class="text-xl my-1">
            <div class="mb-1">Solidjs Mobile UI</div>
            Tailwindcss + css-in-js
          </div>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="grid grid-cols-7 text-center leading-[20px]">
          <For each={WEEK_EN}>
            {(e, i) => <div classList={{ 'text-color/40': i() === 0 || i() === 6 }}>{e}</div>}
          </For>
        </div>
        <MonthPanel
          labelRender={(e) => {
            if (e.txt === '2023-02-06') {
              return (
                <div class="relative text-center">
                  <div class="absolute w-full leading-[12px] text-xs text-primary">休假</div>
                  <span>{e.value}</span>
                </div>
              );
            }
          }}
          month="2023-02-02"
          value={['2023-02-08', '2023-02-17']}
          class="mt-3"
        />
        <div class="flex-between ">
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
          <div class="space-x-2">
            <Button>取消</Button>
            <Button type="primary">确定</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
