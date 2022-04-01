<template>
  <div class="tool-bar">
    <span
      class="tool-button"
      @click="minScreen"
    >
      <svg
        class="svg-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5739"
        width="16"
        height="100%"
      >
        <path
          d="M96 768h832c17.673 0 32 14.327 32 32s-14.327 32-32 32H96c-17.673 0-32-14.327-32-32s14.327-32 32-32z"
          p-id="5740"
        />
      </svg>
    </span>
    <span
      class="tool-button"
      @click="toggleFull"
    >
      <svg
        v-show="state.isMax"
        class="svg-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5596"
        width="14"
        height="100%"
      >
        <path
          d="M832 704H704v128c0 70.692-57.308 128-128 128H192c-70.692 0-128-57.308-128-128V448c0-70.692 57.308-128 128-128h128V192c0-70.692 57.308-128 128-128h384c70.692 0 128 57.308 128 128v384c0 70.692-57.308 128-128 128zM192 384c-35.346 0-64 28.654-64 64v384c0 35.346 28.654 64 64 64h384c35.346 0 64-28.654 64-64V448c0-35.346-28.654-64-64-64H192z m704-192c0-35.346-28.654-64-64-64H448c-35.346 0-64 28.654-64 64v128h192c70.692 0 128 57.308 128 128v192h128c35.346 0 64-28.654 64-64V192z"
          p-id="5597"
        />
      </svg>
      <svg
        v-show="!state.isMax"
        class="svg-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5453"
        width="14"
        height="100%"
      >
        <path
          d="M800 928H224c-70.692 0-128-57.308-128-128V224c0-70.692 57.308-128 128-128h576c70.692 0 128 57.308 128 128v576c0 70.692-57.308 128-128 128z m64-704c0-35.346-28.654-64-64-64H224c-35.346 0-64 28.654-64 64v576c0 35.346 28.654 64 64 64h576c35.346 0 64-28.654 64-64V224z"
          p-id="5454"
        />
      </svg>
    </span>
    <span
      class="tool-button close-button"
      @click="close"
    >
      <svg
        class="svg-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5882"
        width="16"
        height="100%"
      >
        <path
          d="M853.333333 811.918222L811.918222 853.333333 512 553.415111 212.081778 853.333333 170.666667 811.918222 470.584889 512 170.666667 212.081778 212.081778 170.666667 512 470.584889 811.918222 170.666667 853.333333 212.081778 553.415111 512 853.333333 811.918222z"
          p-id="5883"
        />
        <path
          d="M853.333333 811.918222L811.918222 853.333333 512 553.415111 212.081778 853.333333 170.666667 811.918222 470.584889 512 170.666667 212.081778 212.081778 170.666667 512 470.584889 811.918222 170.666667 853.333333 212.081778 553.415111 512 853.333333 811.918222z"
          p-id="5884"
        />
      </svg>
    </span>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const state = reactive({
  isMax: false
})

// 切换最大（小）化
const toggleFull = () => {
  // 发送异步消息
  window.$electron.sendMsg({ handler: 'maxScreen' })
}

// 窗口缩小到任务栏
const minScreen = () => {
  window.$electron.sendMsg({ handler: 'minScreen' })
}

// 接收消息(修改窗口状态参数)
window.$electron.onMessage('maxScreen', (event, arg) => {
  state.isMax = arg.msg
})

// 关闭窗口
const close = () => {
  window.close()
}

defineExpose({
  toggleFull
})

</script>

<style lang="scss" scoped>

.tool-bar {
  -webkit-app-region: no-drag;

  height: 100%;
  cursor: pointer;

  .tool-button {
    display: inline-block;
    height: 100%;
    width: 40px;
    padding: 0 6px;
    text-align: center;
    transition: background 0.1s ease-in-out;

    &:hover {
      background-color: #c4cbd841;
      .svg-icon {
        fill: #fff;
      }
    }
    &.close-button:hover {
      background-color: #ff4f5891;
    }

    .svg-icon {
      vertical-align: middle;
      fill: #b0b6bf;
    }
  }
}
</style>
