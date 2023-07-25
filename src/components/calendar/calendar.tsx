import {
  createContext,
  createMemo,
  createSignal,
  createUniqueId,
  For,
  Index,
  mergeProps,
  onCleanup,
  onMount,
  Show
} from 'solid-js';
import { css } from 'solid-styled-components';
import { MonthPanel } from './monthPanel';
import { Button } from '../button';
import { useConfigProvider } from '../config-provider';
import { Mask } from '../mask';
import dayjs from 'dayjs';
import { Transition } from 'solid-transition-group';

export interface CalendarDay {
  value: string;
  label: string;
}

export type CalendarModeType = 'range' | 'single' | 'multiple';
export interface CalendarProps {
  mode?: CalendarModeType;
  open: boolean;
  onChange?: (v: string[]) => void;
  onClose?: () => void;
  disabledDate?: (e: string) => void;
}

export const CalendarContext = createContext<{
  mode: CalendarModeType;
  onChange: (val: string[]) => void;
} | null>(null);

const WEEK = ['日', '一', '二', '三', '四', '五', '六'];
const START_MONTH = dayjs().startOf('year').format('YYYY-MM-DD');
const EDN_MONTH = dayjs().endOf('year').format('YYYY-MM-DD');

function initData(start = START_MONTH, end = EDN_MONTH) {
  let defaultInit = [];
  let month = start;
  const diff = dayjs(end).diff(dayjs(start), 'month');
  let k = 0;
  while (k <= diff + 1) {
    defaultInit.push(month);
    k++;
    month = dayjs(start).add(k, 'month').format('YYYY-MM-DD');
  }
  return defaultInit;
}

export function Calendar(props: CalendarProps) {
  const { theme } = useConfigProvider();
  const [rangeDate, setRangeDate] = createSignal<string[]>([]);
  const calendarData = createMemo(() => initData());
  const mainProps = mergeProps({ mode: 'range' }, props);

  const id = createUniqueId();

  function clear() {
    setRangeDate([]);
  }

  function confirm() {
    mainProps.onChange?.(rangeDate());
    cancel();
  }

  function cancel() {
    mainProps.onClose?.();
  }

  function handlerScroll(e) {
    if (rangeDate().length > 0) {
      const PANEL_HEIGHT = 300;
      let i = 0;
      document.getElementById(id).scrollTo(0, PANEL_HEIGHT * i);
    }
  }

  onMount(() => {
    document.getElementById(id)?.addEventListener('scroll', handlerScroll);
  });

  onCleanup(() => document.getElementById(id)?.removeEventListener('scroll', handlerScroll));

  return (
    <CalendarContext.Provider
      value={{
        mode: mainProps.mode,
        onChange: (v) => {
          setRangeDate(v);
        }
      }}
    >
      <Mask open={mainProps.open} onClose={cancel}>
        <Transition name="fade-scale">
          <Show when={mainProps.open}>
            <div
              class={`bg-white ${css`
                z-index: ${theme.maskZIndex + 20};
                position: fixed;
                width: 85vw;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 6px;
                text-align: center;
              `}`}
            >
              <Show
                when={rangeDate().length !== 0}
                fallback={<div class="mb-3 text-color/30 pt-4 text-base">选择日期</div>}
              >
                <div class="mb-3 pt-4 text-base">
                  {dayjs(rangeDate()[0]).format('MM月DD日')}
                  {mainProps.mode === 'range' && `- ${dayjs(rangeDate()[1]).format('MM月DD日')}`}
                </div>
              </Show>
              <div class="mx-2">
                <div class="grid grid-cols-7 border-b pb-3">
                  <Index each={WEEK}>
                    {(w, i) => <div classList={{ 'text-color/30': i === 0 || i === 6 }}>{w}</div>}
                  </Index>
                </div>
                <div id={id} class="scrollbar-hide overflow-y-scroll max-h-[300px]">
                  <For each={calendarData()}>
                    {(month) => (
                      <>
                        <div class="font-500 text-left pl-2 mt-3">
                          {dayjs(month).format('YYYY年MM月')}
                        </div>
                        <MonthPanel
                          disabledDate={mainProps.disabledDate}
                          value={rangeDate()}
                          month={month}
                        />
                      </>
                    )}
                  </For>
                </div>
              </div>
              <div class="border-t flex-between px-4 py-3">
                <span
                  on:click={clear}
                  class="font-500"
                  classList={{
                    '!text-color/30': rangeDate().length === 0
                  }}
                  style={{ color: rangeDate().length > 0 ? theme.colorPrimary : 'inherit' }}
                >
                  清除
                </span>
                <div class="space-x-2">
                  <Button plain onClick={cancel}>
                    取消
                  </Button>
                  <Button type="primary" onClick={confirm}>
                    确定
                  </Button>
                </div>
              </div>
            </div>
          </Show>
        </Transition>
      </Mask>
    </CalendarContext.Provider>
  );
}
