<template>
  <AppDefaultLayout>
    <template #header>
      <HeaderMenu />
    </template>

    <template #sidebar>
      <SidebarMenu />
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
  import SidebarMenu from '@/widgets/sidebar-menu/ui/SidebarMenu.vue'
  import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<style lang="css">
  html,
  body {
    height: 100%;
  }

  #app {
    height: 100%;
    overflow-y: hidden;
  }

  /** {*/
  /*  outline: 1px solid red;*/
  /*}*/
</style>
