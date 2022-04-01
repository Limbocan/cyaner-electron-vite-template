<template>
  <div
  class="cyan-input"
  :style="{ '--main-color': props.color }"
>
    <textarea
      v-if="props.type === 'textarea'"
      class="input"
      :value="props.modelValue"
      :class="props.modelValue ? 'active' : ''"
      :rows="props.rows"
      :maxlength="props.maxlength"
      @input="changeVal"
    />
    <input
      v-else
      :value="props.modelValue"
      :class="props.modelValue ? 'active' : ''"
      :type="props.type"
      required
      class="input"
      @input="changeVal"
    >
    <span class="bar"></span>
    <label class="label-title">{{ label }}</label>
    <i
      v-show="props.modelValue"
      class="iconfont mocclose close-icon"
      @click="clearVal"
    />
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  label: { type: String, default: '' },
  rows: { type: [Number, String], default: 2 },
  maxlength: { type: [Number, String], default: '' },
  color: { type: String, default: '#fff' },
})
const emits = defineEmits(['update:modelValue'])

const changeVal = (val) => {
  const value = val.target.value
  emits('update:modelValue', value)
}

const clearVal = () => {
  emits('update:modelValue', '')
}

</script>

<style lang="scss" scoped>
// 表单输入框
.cyan-input {
  --main-color: #fff;

  position: relative;
  width: 100%;
  margin-top: 16px;

  .input {
    font-size: 14px;
    padding: 8px 8px 4px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #757575;
    border-radius: 4px 4px 0 0;
    resize: none;
    color: var(--main-color);
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }

  .label-title {
    color: var(--main-color);
    font-size: 14px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 8px;
    font-family: cursive, KaiTi, sans-serif;
    transition: all 0.2s ease-in-out;
  }

  .input:focus ~ .label-title,
  .active ~ .label-title {
    top: -12px;
    font-size: 10px;
    color: var(--main-color);
  }

  .bar {
    position: relative;
    display: block;
    width: 100%;

    &::before,
    &::after {
      content: '';
      height: 2px;
      width: 0;
      bottom: 0;
      position: absolute;
      background: var(--main-color);
      transition: 0.2s ease all;
    }

    &::before {
      left: 50%;
    }

    &::after {
      right: 50%;
    }
  }

  .input:focus ~ .bar:before,
  .input:focus ~ .bar:after,
  .active ~ .bar:before,
  .active ~ .bar:after {
    width: 50%;
  }

  .close-icon {
    position: absolute;
    right: 4px;
    bottom: 0;
    color: #fff;
    cursor: pointer;
  }
}

@keyframes inputHighlighter {
  from {
    background: transparent;
  }

  to {
    width: 0;
    background: transparent;
  }
}
</style>
