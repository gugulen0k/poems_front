<template>
  <AppDefaultLayout>
    <template #header>
      <HeaderMenu />
    </template>

    <template #content>
      <RouterView />
    </template>
  </AppDefaultLayout>

  <VueQueryDevtools />
</template>

<script setup>
  import AppDefaultLayout from '@/shared/ui/layouts/AppDefaultLayout.vue'
  import HeaderMenu from '@/widgets/header-menu'
  import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<style lang="css">
  html,
  body {
    height: 100%;
  }

  #app {
    min-height: 100%;
  }
</style>
