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

.menu-bar {
  height: 100%;
  .app-logo {
    -webkit-app-region: drag;
    height: 100%;
    line-height: var(--header-height);
    background-image: url('../../assets/app.ico');
    width: 30px;
    background-position: center;
    background-size: contain;
    margin: 0 10px 0 6px;
    background-repeat: no-repeat;
  }
}

.space-div {
  flex: 1;
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: var(--header-height);
}
</style>