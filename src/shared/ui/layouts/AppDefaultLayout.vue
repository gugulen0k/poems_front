<template>
  <div class="h-full grid grid-cols-[max-content_1fr]">
    <nav>
      <SidebarMenu />
    </nav>

    <main class="h-full flex flex-col gap-4 tablet:p-4 laptop:px-10">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
  import SidebarMenu from '@/widgets/sidebar-menu'
</script>
