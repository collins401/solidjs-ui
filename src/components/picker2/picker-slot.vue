<template>
  <div class="picker-slot">
    <div ref="wrapper" class="picker-slot-wrapper" :class="{ dragging: dragging }" :style="{ height: contentHeight + 'px' }">
      <div class="picker-item" v-for="itemValue in mutatingValues" :class="{ 'picker-selected': itemValue === currentValue }" :style="{ height: '36px', lineHeight: '36px' }">
        {{ typeof itemValue === 'object' && itemValue[valueKey] ? itemValue[valueKey] : itemValue }}
      </div>
    </div>
  </div>
</template>

<style>
  .picker-slot {
    font-size: 18px;
    overflow: hidden;
    position: relative;
    max-height: 100%;
    display: flex;
  }

  .picker-slot-wrapper {
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
    backface-visibility: hidden;
  }

  .picker-slot-wrapper.dragging,
  .picker-slot-wrapper.dragging .picker-item {
    transition-duration: 0s;
  }

  .picker-item {
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #707274;
    left: 0;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    transition-duration: .3s;
    backface-visibility: hidden;
  }

  .picker-slot-absolute .picker-item {
    position: absolute;
  }

  .picker-item.picker-selected {
    color: red;
  }

</style>

<script type="text/babel">
  import draggable from './draggable';
  import translateUtil from './translate';
  const ITEM_HEIGHT = 36;
  const VISIBLE_ITEM_COUNT = 5;
  export default {
    name: 'picker-slot',

    props: {
      values: {
        type: Array,
        default() {
          return [];
        }
      },
      value: {},
      valueKey: String,
      defaultIndex: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        currentValue: this.value,
        mutatingValues: this.values,
        dragging: false,
        animationFrameId: null
      };
    },

    // mixins: [emitter],

    computed: {
      contentHeight() {
        return ITEM_HEIGHT * VISIBLE_ITEM_COUNT;
      },
      valueIndex() {
        var valueKey = this.valueKey;
        if (this.currentValue instanceof Object) {
          for (var i = 0, len = this.mutatingValues.length; i < len ; i++) {
            if (this.currentValue[valueKey] === this.mutatingValues[i][valueKey]) {
              return i;
            }
          }
          return -1;
        } else {
          return this.mutatingValues.indexOf(this.currentValue);
        }
      },
      dragRange() {
        var values = this.mutatingValues;
        return [-ITEM_HEIGHT * (values.length - Math.ceil(VISIBLE_ITEM_COUNT / 2)), ITEM_HEIGHT * Math.floor(VISIBLE_ITEM_COUNT / 2) ];
      },
      maxTranslateY() {
        return ITEM_HEIGHT * Math.floor(VISIBLE_ITEM_COUNT / 2);
      }
    },

    methods: {
      value2Translate(value) {
        var values = this.mutatingValues;
        var valueIndex = values.indexOf(value);
        var offset = Math.floor(VISIBLE_ITEM_COUNT / 2);

        if (valueIndex !== -1) {
          return (valueIndex - offset) * -ITEM_HEIGHT;
        }
      },

      translate2Value(translate) {
        translate = Math.round(translate / ITEM_HEIGHT) * ITEM_HEIGHT;
        var index = -(translate - Math.floor(VISIBLE_ITEM_COUNT / 2) * ITEM_HEIGHT) / ITEM_HEIGHT;

        return this.mutatingValues[index];
      },

      initEvents() {
        var el = this.$refs.wrapper;
        var dragState = {};

        var velocityTranslate, prevTranslate;

        draggable(el, {
          start: (event) => {
            dragState = {
              range: this.dragRange,
              start: new Date(),
              startLeft: event.pageX,
              startTop: event.pageY,
              startTranslateTop: translateUtil.getElementTranslate(el).top
            };
          },

          drag: (event) => {
            this.dragging = true;

            dragState.left = event.pageX;
            dragState.top = event.pageY;

            var deltaY = dragState.top - dragState.startTop;
            var translate = dragState.startTranslateTop + deltaY;

            translateUtil.translateElement(el, null, translate);

            velocityTranslate = translate - prevTranslate || translate;

            prevTranslate = translate;
          },

          end: (event) => {
            this.dragging = false;

            var momentumRatio = 7;
            var currentTranslate = translateUtil.getElementTranslate(el).top;
            var duration = new Date() - dragState.start;
            let distance = Math.abs(dragState.startTranslateTop - currentTranslate);

            let rect, offset;
            if (distance < 6) {
              rect = this.$el.getBoundingClientRect();
              offset = Math.floor((event.clientY - (rect.top + (VISIBLE_ITEM_COUNT - 1) * ITEM_HEIGHT / 2)) / ITEM_HEIGHT) * ITEM_HEIGHT;

              if (offset > this.maxTranslateY) {
                offset = this.maxTranslateY;
              }

              velocityTranslate = 0;
              currentTranslate -= offset;
            }

            var momentumTranslate;
            if (duration < 300) {
              momentumTranslate = currentTranslate + velocityTranslate * momentumRatio;
            }

            var dragRange = dragState.range;

            this.$nextTick(() => {
              var translate;
              if (momentumTranslate) {
                translate = Math.round(momentumTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
              } else {
                translate = Math.round(currentTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
              }
              translate = Math.max(Math.min(translate, dragRange[1]), dragRange[0]);
              translateUtil.translateElement(el, null, translate);
              this.currentValue = this.translate2Value(translate);
              console.log('this.currentValue', this.currentValue);
            });

            dragState = {};
          }
        });
      },

      doOnValueChange() {
        var value = this.currentValue;
        var wrapper = this.$refs.wrapper;
        translateUtil.translateElement(wrapper, null, this.value2Translate(value));
      }
    },

    mounted() {
      this.initEvents();
      this.doOnValueChange();
    },

    watch: {
      values(val) {
        this.mutatingValues = val;
      },

      mutatingValues(val) {
        if (this.valueIndex === -1) {
          this.currentValue = (val || [])[0];
        }
      },
      currentValue(val) {
        this.doOnValueChange();
        this.$emit('input', val);
      },
      defaultIndex(val) {
        if ((this.mutatingValues[val] !== undefined) && (this.mutatingValues.length >= val + 1)) {
          this.currentValue = this.mutatingValues[val];
        }
      }
    }
  };
</script>
