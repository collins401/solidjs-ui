import { createSignal, For } from 'solid-js';
import dayjs from 'dayjs';
import { Calendar } from './calendar';
import { useToggle } from '../utils/useToggle';
import { MonthPanel } from './monthPanel';
import { SvgIcon } from '../svgIcon';
import { styled } from 'solid-styled-components';

const WEEK_EN = ['日', '一', '二', '三', '四', '五', '六'];
const WEEK_EN2 = ['一', '二', '三', '四', '五', '六', '日'];
const MONTH = dayjs().format('YYYY-MM-DD');

const BigStyled = styled('div')`
  position: relative;
  &:before {
    content: attr(data-month);
    display: block;
    font-size: 120px;
    color: rgba(0, 0, 0, 0.2);
    font-weight: 600;
    position: absolute;
    text-align: center;
    line-height: 190px;
    width: 100%;
    height: 100px;
    z-index: 0;
  }
`;
export default function CalendarDemo() {
  const [visible, toggle] = useToggle(false);
  const [single, singleToggle] = useToggle<boolean>(false);
  const [multiple, multipleToggle] = useToggle(false);
  const [month, setMonth] = createSignal(MONTH);
  const [value1, setValue1] = createSignal([]);
  const [value2, setValue2] = createSignal([]);
  const [value3, setValue3] = createSignal([]);
  const [value4, setValue4] = createSignal([]);

  function switchMonth(i) {
    const m = dayjs(month()).add(i, 'month').format('YYYY-MM-DD');
    setMonth(m);
  }
  return (
    <div class="m-3">
      <div class="text-color/60 mb-1">自定义面板日历及水印: {value1().toString()}</div>
      <div class="bg-color rounded shadow p-4 mb-3">
        <div class="flex items-center justify-between text-center mb-3 space-x-2">
          <SvgIcon fill="fill-primary" type="back" onClick={() => switchMonth(-1)} />
          <span class="text-base font-medium">{dayjs(month()).format('YYYY年MM月')}</span>
          <SvgIcon
            onClick={() => switchMonth(1)}
            type="back"
            fill="fill-primary"
            class="transform rotate-180 origin-center relative"
          />
        </div>
        <div class="grid grid-cols-7 text-center leading-[20px]">
          <For each={WEEK_EN}>
            {(e, i) => <div classList={{ 'text-color/40': i() === 0 || i() === 6 }}>{e}</div>}
          </For>
        </div>
        <BigStyled data-month={dayjs(month()).format('M')}>
          <MonthPanel
            month={month()}
            value={['2023-01-11', '2023-01-20']}
            class="relative text-sm mt-3 z-1"
            onChange={(e, o) => setValue1(o)}
            disabledDate={(e) => e < '2023-01-06'}
          />
        </BigStyled>
      </div>
      <div class="bg-color rounded shadow my-3">
        <div class=" border-b active:bg-active">
          <div class="flex items-center justify-between p-3" on:click={singleToggle}>
            <div>选择日期</div>
            <div>
              <span>{value2()}</span>
              {value2().length === 0 && <span class="text-color/30">请选择</span>}
              <SvgIcon size="12px" type="back" class="transform rotate-180 origin-center" />
            </div>
          </div>
        </div>
        <div class="border-b active:bg-active">
          <div class="flex items-center justify-between p-3" on:click={toggle}>
            <div>选择日期范围</div>
            <div>
              <span>{value3().toString()}</span>
              {value3().length === 0 && <span class="text-color/30">请选择</span>}
              <SvgIcon size="12px" type="back" class="transform rotate-180 " />
            </div>
          </div>
        </div>
        <div class="active:bg-active">
          <div class="flex items-center justify-between p-3" on:click={multipleToggle}>
            <div class="flex-shrink-0 mr-3">选择多个日期</div>
            <div class="text-right flex-1">
              <span>{value4().toString()}</span>
              {value4().length === 0 && <span class="text-color/30">请选择</span>}
            </div>
            <SvgIcon size="12px" type="back" class="transform rotate-180 " />
          </div>
        </div>
      </div>
      <div>设置周起始日为周一、自定义标记</div>
      <div class="bg-color rounded shadow p-4 mb-3">
        <div class="grid grid-cols-7 text-center mb-2">
          <For each={WEEK_EN2}>
            {(e, i) => <div classList={{ 'text-color/40': i() === 0 || i() === 6 }}>{e}</div>}
          </For>
        </div>
        <MonthPanel
          weekStartOn={1}
          month={month()}
          labelRender={(e) => {
            if (e.txt === '2023-02-05') {
              return (
                <div class="relative text-center">
                  <div class="absolute w-full leading-[12px] text-xs text-danger">元宵</div>
                  <span>{e.value}</span>
                </div>
              );
            } else if (e.txt === '2023-02-06') {
              return (
                <div class="relative text-center">
                  <div class="absolute w-full -mt-2px leading-[12px] text-xs text-primary">
                    请假
                  </div>
                  <span>{e.value}</span>
                </div>
              );
            }
          }}
        />
      </div>
      <Calendar open={visible()} onChange={(e) => setValue3(e)} onClose={() => toggle(false)} />
      <Calendar
        open={single()}
        mode="single"
        onChange={(e) => setValue2(e)}
        onClose={() => singleToggle(false)}
      />
      <Calendar
        open={multiple()}
        mode="multiple"
        onChange={(e) => setValue4(e)}
        onClose={() => multipleToggle(false)}
      />
    </div>
  );
}
