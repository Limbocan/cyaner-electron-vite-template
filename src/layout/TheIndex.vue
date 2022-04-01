<template>
  <div class="layout-content">
    <TheHeader />
    <div class="layout-body">
      <slot name="default" />
    </div>
  </div>
</template>

<script setup>
import TheHeader from './header/TheHeader.vue'

</script>

<style lang="scss" scoped>
.layout-content {
  --header-height: 34px;
  --body-bg-color: #d1d1d1;

  position: relative;
  height: 100%;
  width: 100%;

  .layout-body {
    height: calc(100% - var(--header-height));
    background-color: var(--body-bg-color);
    overflow: auto;
  }
}
</style>