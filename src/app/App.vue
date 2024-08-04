<template>
  <AppDefaultLayout>
    <template #header>
      <HeaderMenu />
    </template>

    <template #content>
      <RouterView />
    </template>

    <template #footer> </template>
  </AppDefaultLayout>
</template>

<script setup>
  import AppDefaultLayout from '@/shared/ui/layouts/AppDefaultLayout.vue'
  import HeaderMenu from '@/widgets/header-menu';
</script>
