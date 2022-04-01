<template>
  <header>
    <div class="menu-bar">
      <div class="app-logo" />
    </div>
    <div class="space-div">{{ route.meta.title }}</div>
    <TheTools ref="TheToolsRef" />
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import TheTools from './TheTools.vue'

const route = useRoute()

window.$electron.onMessage('winMove', () => closeMenu())
window.$electron.onMessage('maxScreen', () => closeMenu())
window.$electron.onMessage('minScreen', () => closeMenu())

</script>

<style lang="scss" scoped>
header {
  -webkit-app-region: drag;

  height: var(--header-height);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background-color: var(--theme-color);
  user-select: none;
}

.space-div {
  flex: 1;
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: var(--header-height);
}
</style>