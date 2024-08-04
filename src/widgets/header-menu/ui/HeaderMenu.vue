<template>
  <div class="p-2">
    <Menubar :model="items">
      <template #start>
        <RouterLink to="/">
          <Button icon="pi pi-home" aria-label="Home" />
        </RouterLink>
      </template>

      <template #item="{ item, props }">
        <RouterLink :to="item.route">
          <a class="flex items-center" v-bind="props.action">
            <span :class="item.icon" />
            <span class="ml-2 2xl:text-lg 2xl:font-bold">{{ item.label }}</span>
          </a>
        </RouterLink>
      </template>

      <template #end>
        <div class="flex items-center gap-4">
          <Button
            icon="pi pi-palette"
            aria-label="theme-switcher"
            @click="toggleColorScheme()"
          />
          <Avatar icon="pi pi-user" size="large" />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const items = ref([
    {
      label: 'Poems',
      icon: 'pi pi-book',
      route: '/poems'
    },
    {
      label: 'Authors',
      icon: 'pi pi-users',
      route: '/authors'
    },
  ])

  function toggleColorScheme() {
    const element = document.querySelector('html')
    element.classList.toggle('theme-switcher')
  }
</script>
