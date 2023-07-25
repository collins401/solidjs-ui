import { createEffect, createSignal, For, mergeProps, onMount, splitProps } from 'solid-js';
import { css } from 'solid-styled-components';
import draggable from './draggable';
import translateUtil from './translate';
import { nextTick } from '../utils/index';

export type PickerOption =
  | string
  | {
      label: string;
      value: string;
    };

export type PickerValue = string | null;
interface PickerSlot2Props {
  onChange: (val?: string, option?: PickerOption) => void;
  defaultValue?: string;
  options: string[] | PickerOption[];
  class?: any;
  classList?: any;
}
const ITEM_HEIGHT = 36;
const VISIBLE_ITEM_COUNT = 5;
const CONTENT_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEM_COUNT;
const maxTranslateY = ITEM_HEIGHT * Math.floor(VISIBLE_ITEM_COUNT / 2);

export function PickerSlot2(props: PickerSlot2Props) {
  let wrapper;
  const mainProps = mergeProps({ options: [] }, props);
  const [mutatingValues, setMutatingValues] = createSignal(props.options);
  const [dragging, setDragging] = createSignal();
  const [currentValue, setCurrentValue] = createSignal(
    mainProps.defaultValue || mutatingValues()[0]['value']
  );

  const dragRange = () => [
    -ITEM_HEIGHT * (mutatingValues().length - Math.ceil(VISIBLE_ITEM_COUNT / 2)),
    ITEM_HEIGHT * Math.floor(VISIBLE_ITEM_COUNT / 2)
  ];

  createEffect(() => {
    setMutatingValues(mainProps.options);
  });

  onMount(() => {
    if (wrapper) {
      initEvents();
      doOnValueChange();
    }
  });

  function value2Translate(val?: string) {
    const cur = val || currentValue();
    const vIndex = mutatingValues().findIndex((s) => s['value'] === cur);
    const offset = Math.floor(VISIBLE_ITEM_COUNT / 2);
    if (vIndex !== -1) {
      return (vIndex - offset) * -ITEM_HEIGHT;
    }
    return 0;
  }

  function translate2Value(translate) {
    const num = Math.round(translate / ITEM_HEIGHT) * ITEM_HEIGHT;
    const index = -(num - Math.floor(VISIBLE_ITEM_COUNT / 2) * ITEM_HEIGHT) / ITEM_HEIGHT;
    return mutatingValues()[index];
  }

  function initEvents() {
    let dragState: any = {};
    let velocityTranslate;
    let prevTranslate;

    draggable(wrapper, {
      start: (event) => {
        dragState = {
          start: Date.now(),
          startTop: event.pageY,
          startTranslateTop: translateUtil.getElementTranslate(wrapper).top
        };
      },

      drag: (event) => {
        setDragging(true);
        const deltaY = event.pageY - dragState.startTop;
        const val = dragState.startTranslateTop + deltaY;
        translateUtil.translateElement(wrapper, val);
        velocityTranslate = val - prevTranslate || val;
        prevTranslate = val;
      },

      end: (event) => {
        setDragging(false);
        const momentumRatio = 7;
        let currentTranslate = translateUtil.getElementTranslate(wrapper).top;
        const duration = Date.now() - dragState.start;
        const distance = Math.abs(dragState.startTranslateTop - currentTranslate);
        if (distance < 10) {
          const rect = wrapper.getBoundingClientRect();
          let offset =
            Math.floor(
              (event.clientY - (rect.top + ((VISIBLE_ITEM_COUNT - 1) * ITEM_HEIGHT) / 2)) /
                ITEM_HEIGHT
            ) * ITEM_HEIGHT;

          if (offset > maxTranslateY) {
            offset = maxTranslateY;
          }

          velocityTranslate = 0;
          currentTranslate -= offset;
        }

        let momentumTranslate;
        if (duration < 300) {
          momentumTranslate = currentTranslate + velocityTranslate * momentumRatio;
        }
        nextTick(() => {
          let translate;
          if (momentumTranslate) {
            translate = Math.round(momentumTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
          } else {
            translate = Math.round(currentTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
          }
          translate = Math.max(Math.min(translate, dragRange()[1]), dragRange()[0]);
          translateUtil.translateElement(wrapper, translate);
          const val = translate2Value(translate);
          setCurrentValue(val['value']);
          mainProps.onChange?.(val['value'], val);
          // translateUtil.translateElement(wrapper, value2Translate(val['value']));
          dragState = {};
        });
      }
    });
  }

  function doOnValueChange() {
    translateUtil.translateElement(wrapper, value2Translate());
  }

  return (
    <div class={`overflow-hidden text-center ${mainProps.class}`}>
      <div
        ref={wrapper}
        class={css`
          -webkit-transition-duration: ${dragging() ? '0s' : '0.3s'};
          transition-duration: ${dragging() ? '0s' : '0.3s'};
          transition-timing-function: ease-out;
          -webkit-transition-timing-function: ease-out;
          backface-visibility: hidden;
        `}
        style={{ height: CONTENT_HEIGHT + 'px' }}
        classList={mainProps.classList}
      >
        <For each={mutatingValues()}>
          {(item) => (
            <div
              class={css`
                height: ${String(ITEM_HEIGHT)}px;
                line-height: ${String(ITEM_HEIGHT)}px;
                padding: 0 10px;
                white-space: nowrap;
                position: relative;
                overflow: hidden;
                text-overflow: ellipsis;
                box-sizing: border-box;
                transition-duration: 0.3s;
                backface-visibility: hidden;
              `}
            >
              {typeof item === 'object' ? item['label'] : item}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
