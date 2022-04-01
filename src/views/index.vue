<template>
  <Layout>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </Layout>
</template>

<script setup>
import Layout from '@/layout/TheIndex.vue'

</script>

<style lang="scss" scoped>

</style>