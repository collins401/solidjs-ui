import { createEffect, createSignal, createUniqueId, For, onCleanup, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';

export interface PickerOption {
  label: string;
  value: string;
}
export type PickerValue = string | null;

export interface PickerSoltProps {
  columns: PickerOption[];
  value?: PickerValue;
  onChange?: (e: string, option: PickerOption) => void;
}

const ITEM_HEIGHT = 38;
export function PickerSolt(props: PickerSoltProps) {
  const [step, setStep] = createSignal(0);
  const id = createUniqueId();

  createEffect(() => {
    const defaultValue = props.columns?.findIndex((s) => s.value === props.value);
    console.log('defaultValue', defaultValue);
    if (defaultValue !== -1) {
      document.getElementById(id)?.scrollTo(0, ITEM_HEIGHT * defaultValue);
      setStep(defaultValue);
    } else {
      document.getElementById(id)?.scrollTo(0, 0);
    }
  });

  onMount(() => {
    document.getElementById(id)?.addEventListener('scroll', handlerScroll, true);
  });
  onCleanup(() => {
    document.getElementById(id)?.removeEventListener('scroll', handlerScroll);
  });

  function handlerScroll(event) {
    try {
      const lastStep = Math.round(event.target?.scrollTop / 38);
      setStep(lastStep);
      props.onChange?.(props.columns[lastStep].value, props.columns[lastStep]);
    } catch (error) {}
  }

  return (
    <div class="overflow-scroll flex-1 relative text-center">
      <div class="h-[200px] py-[80px] scrollbar-hide overflow-y-scroll scroll-snap-type" id={id}>
        <For each={props.columns}>
          {(item) => (
            <div class="h-[38px] truncate px-2 snap-center" style={{ 'line-height': '38px' }}>
              {item.label}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
