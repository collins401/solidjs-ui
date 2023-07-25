import { createSignal, createUniqueId, For, mergeProps } from 'solid-js';
import { useConfigProvider } from '../config-provider';
import { Popup } from '../popup';
import { css, styled } from 'solid-styled-components';
import { PickerSolt } from './picker-slot';
import type { PickerOption, PickerValue } from './picker-slot';
import { createEffect } from 'solid-js';
export type { PickerOption };
export interface PickerProps {
  columns: PickerOption[][];
  value?: PickerValue[];
  title?: string;
  open: boolean;
  onClose: () => void;
  onConfirm: (e: any[], option: any) => void;
}
export const PickerStyled = styled('div')`
  position: relative;
  height: 200px;
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 80px;
    left: 0;
    pointer-events: none;
    z-index: 1;
  }
  &:before {
    top: 0;
    border-bottom-width: 0.5px;
    background: linear-gradient(#fff, rgba(255, 255, 255, 0.5));
  }
  &:after {
    bottom: 0;
    border-top-width: 0.5px;
    background: linear-gradient(rgba(255, 255, 255, 0.5), #fff);
  }
  .dark & {
    &:before {
      background: linear-gradient(#27272a, rgba(39, 39, 42, 0.5));
    }
    &:after {
      background: linear-gradient(rgba(39, 39, 42, 0.5), #27272a);
    }
  }
`;
export function Picker(props: PickerProps) {
  const [visible, setVisible] = createSignal(props.open);
  const [defaultValue, setSefaultValue] = createSignal<PickerValue[]>([]);
  const [selectItem, setSelectItem] = createSignal([]);
  const [selectItemOption, setSelectItemOption] = createSignal([]);
  const { theme } = useConfigProvider();
  const mainProps = mergeProps(
    {
      value: []
    },
    props
  );
  const id = createUniqueId();

  createEffect(() => {
    setVisible(mainProps.open);
    const initArray = props.columns.map((s) => []);
    setSelectItem(initArray);
    setSelectItemOption(initArray);
    setSefaultValue(mainProps.value);
  });

  function cancel() {
    setVisible(false);
    mainProps.onClose?.();
  }

  function confirmTxt() {
    console.log(selectItem());
    props.onConfirm?.(selectItem(), selectItemOption());
  }

  function changePicker(e, option, index) {
    const cache = [...selectItem()];
    const cacheOption = [...selectItemOption()];
    cache[index] = e;
    cacheOption[index] = option;
    setSelectItem(cache);
    setSelectItemOption(cacheOption);
  }
  return (
    <Popup
      open={visible()}
      position="bottom"
      class="rounded-t-8px"
      closeOnMaskClick={true}
      onClose={cancel}
    >
      <div class="flex-center font-500 leading-[48px] border-b text-center text-base">
        <div class="w-[60px] text-color/60 font-400" on:click={cancel}>
          取消
        </div>
        <div class="flex-1 truncate">{mainProps.title}</div>
        <div
          id={id}
          class={css`
            color: ${theme.colorPrimary};
            width: 60px;
          `}
          on:click={confirmTxt}
        >
          确定
        </div>
      </div>
      <PickerStyled class={`${theme.classPrefix}-picker flex-center`}>
        <For each={mainProps.columns}>
          {(slot, i) => (
            <PickerSolt
              value={defaultValue()[i()]}
              onChange={(e, option) => changePicker(e, option, i())}
              columns={slot}
            />
          )}
        </For>
      </PickerStyled>
    </Popup>
  );
}
