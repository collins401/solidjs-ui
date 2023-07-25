import { createSignal, createEffect, createUniqueId, For, mergeProps } from 'solid-js';
import { useConfigProvider } from '../config-provider';
import { Popup } from '../popup';
import { css, styled } from 'solid-styled-components';
import { PickerSlot2 } from './pickerSlot2';
import type { PickerOption, PickerValue } from './pickerSlot2';
export type { PickerOption };
export interface PickerProps {
  options: PickerOption[][];
  value?: PickerValue[];
  title?: string;
  open: boolean;
  onClose?: () => void;
  onConfirm: (e: any[], option: any) => void;
}
export const PickerStyled = styled('div')`
  position: relative;
  height: 180px;
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 72px;
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
export function Picker2(props: PickerProps) {
  const [visible, setVisible] = createSignal(props.open);
  const [defaultValue, setDefaultValue] = createSignal<PickerValue[] | null>();
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
    if (!defaultValue()) {
      const initArray = props.options.map((s) => s[0]['value']);
      console.log('initArray', initArray);
      setDefaultValue(initArray);
    }
  });

  function cancel() {
    setVisible(false);
    mainProps.onClose?.();
  }

  function confirmTxt() {
    props.onConfirm?.(defaultValue(), selectItemOption());
    setVisible(false);
  }

  function changePicker(e, option, index) {
    console.log(e, option, index);
    const cache = [...defaultValue()];
    const cacheOption = [...selectItemOption()];
    cache[index] = e;
    cacheOption[index] = option;
    setDefaultValue(cache);
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
        <For each={mainProps.options}>
          {(slot, i) => (
            <PickerSlot2
              class="flex-1"
              onChange={(e, option) => changePicker(e, option, i())}
              options={slot}
              defaultValue={defaultValue()?.[i()]}
            />
          )}
        </For>
      </PickerStyled>
    </Popup>
  );
}
