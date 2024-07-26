import type { JSX } from 'solid-js';
import { createEffect, createMemo, createSignal, For, mergeProps, useContext } from 'solid-js';
import { css, styled } from 'solid-styled-components';
import dayjs from 'dayjs';
import { useConfigProvider } from '../config-provider';
import { getOpacityColor } from '../utils/colorOpacity';
import { CalendarContext } from './calendar';
import type { CalendarModeType } from './calendar';
export { getOpacityColor };
export interface DateType {
  txt: string;
  value: string;
}

export interface MonthPanelProps {
  /**
   * format: YYYY-MM-DD
   */
  month: string;
  mode?: CalendarModeType;
  weekStartOn?: number;
  class?: string;
  value?: string[];
  labelRenderPicker?: boolean;
  labelRender?: (date: DateType) => JSX.Element;
  onChange?: (date: DateType, val: string[]) => void;
  disabledDate?: (v: string) => void;
}
const TODAY = dayjs().format('YYYY-MM-DD');

export function MonthPanel(props: MonthPanelProps) {
  const { theme } = useConfigProvider();
  const groupContext = useContext(CalendarContext);
  const mainProps = mergeProps(
    { weekStartOn: 0, mode: groupContext?.mode || 'range', value: [] },
    props
  );
  const [rangeDate, setRangeDate] = createSignal<string[]>([]);

  createEffect(() => {
    setRangeDate(Array.isArray(mainProps.value) ? mainProps.value : []);
  });
  const DateStyled = styled('div')`
    position: relative;
    .cur-start,
    .cur-end {
      &:before {
        content: '';
        position: absolute;
        width: 50%;
        height: 100%;
        top: 0;
        left: 50%;
        background: ${getOpacityColor(theme.colorPrimary, 0.2)};
      }
    }
    .cur-end:before {
      left: 0;
    }
    .cur:after {
      content: '';
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      position: absolute;
      border-radius: 100%;
      z-index: -1;
      width: 34px;
      height: 100%;
      background: ${theme.colorPrimary};
    }
    .cur-range {
      background: ${getOpacityColor(theme.colorPrimary, 0.2)};
    }
  `;
  function picker(e: DateType) {
    if (mainProps.labelRender && mainProps.labelRenderPicker) {
      return;
    }
    let cacheArr = [];
    if (mainProps.mode === 'single') {
      cacheArr = [e.txt];
    } else if (mainProps.mode === 'multiple') {
      const isExist = rangeDate().findIndex((s) => e.txt === s);
      if (isExist === -1) {
        cacheArr = [...rangeDate(), e.txt];
      } else {
        cacheArr = [...rangeDate()];
        cacheArr.splice(isExist, 1);
      }
    } else {
      if (rangeDate().length === 0 || rangeDate()[0] !== rangeDate()[1]) {
        cacheArr = [e.txt, e.txt];
      } else if (rangeDate()[0] > e.txt) {
        cacheArr = [e.txt, rangeDate()[1]];
      } else if (rangeDate()[0] < e.txt) {
        cacheArr = [rangeDate()[0], e.txt];
      }
    }
    setRangeDate(cacheArr);
    mainProps.onChange?.(e, cacheArr);
    if (groupContext) {
      groupContext.onChange(cacheArr);
    }
  }

  const totalDays = createMemo(() => {
    let result: DateType[] = [];
    const curMonth = dayjs(mainProps.month).format('YYYY-MM');
    for (let i = 1; i <= dayjs(mainProps.month).daysInMonth(); i++) {
      let txt = i < 10 ? `0${i}` : `${i}`;
      result.push({
        value: `${i}`,
        txt: `${curMonth}-${txt}`
      });
    }
    return result;
  });

  const fillBlankDate = createMemo(() => {
    const defaultStart = dayjs(totalDays()?.[0]?.txt).day();
    let weekStart = defaultStart - mainProps.weekStartOn;

    if (weekStart < 0) {
      weekStart = 7 + weekStart;
    }
    return Array.from({ length: weekStart }, (e, i) => i);
  });

  function hightClass(date: string) {
    if (mainProps.disabledDate?.(date)) {
      return 'pointer-events-none text-color/30';
    }
    if (mainProps.mode === 'range') {
      if (rangeDate()?.[0] < date && rangeDate()?.[1] > date) {
        return 'cur-range';
      }
      if (rangeDate()?.[0] === date && rangeDate()?.[0] === rangeDate()?.[1]) {
        return 'cur text-white';
      } else if (rangeDate()?.[0] === date && rangeDate()?.[0] !== rangeDate()?.[1]) {
        return 'text-white cur cur-start';
      } else if (rangeDate()?.[1] === date && rangeDate()?.[0] !== rangeDate()?.[1]) {
        return 'text-white cur cur-end';
      }
    } else if (rangeDate().includes(date)) {
      return 'cur text-white';
    }
  }

  return (
    <div class={`grid grid-cols-7 gap-y-[5px] leading-[34px] text-center ${mainProps.class || ''}`}>
      <For each={fillBlankDate()}>{() => <div />}</For>
      <For each={totalDays()}>
        {(day) => (
          <DateStyled>
            <div
              class={`${hightClass(day.txt)} ${css`
                position: relative;
                z-index: 1;
                color: ${day.txt === rangeDate()?.[0] || day.txt === rangeDate()?.[1]
                  ? '#fff'
                  : 'inherit'};
              `}`}
              on:click={() => picker(day)}
            >
              {mainProps.labelRender?.(day) ? (
                mainProps.labelRender(day)
              ) : (
                <>
                  {day.txt === TODAY && (
                    <span
                      class={css`
                        position: absolute;
                        width: 5px;
                        height: 5px;
                        border-radius: 3px;
                        background: currentColor;
                        left: 50%;
                        top: 2px;
                        color: ${theme.colorPrimary};
                      `}
                    />
                  )}
                  {day.value}
                </>
              )}
            </div>
          </DateStyled>
        )}
      </For>
    </div>
  );
}
