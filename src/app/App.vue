<template>
  <AppDefaultLayout>
    <template #header>
      <HeaderMenu />
    </template>

    <template #content>
      <SidebarMenu />
      <RouterView />
    </template>

    <template #footer> </template>
  </AppDefaultLayout>
</template>

<script setup>
  import AppDefaultLayout from '@/shared/ui/layouts/AppDefaultLayout.vue'
  import HeaderMenu from '@/widgets/header-menu'
  import SidebarMenu from '@/widgets/sidebar-menu'
</script>
