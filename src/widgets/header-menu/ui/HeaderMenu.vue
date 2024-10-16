<template>
  <Menubar class="bg-transparent border-none">
    <template #start>
      <RouterLink to="/">
        <span
          class="text-2xl py-2 px-4 rounded-md transition-all hover:bg-[--p-button-text-primary-hover-background]"
          >VerseNest</span
        >
      </RouterLink>
    </template>

    <template #end>
      <div class="flex items-center gap-4">
        <Avatar icon="pi pi-user" size="large" />
      </div>
    </template>
  </Menubar>
</template>

<script setup></script>
