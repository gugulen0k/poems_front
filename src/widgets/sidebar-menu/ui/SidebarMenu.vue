<template>
  <aside class="h-full overflow-hidden m-2 flex flex-col gap-8">
    <Button
      class="transition-all"
      :icon="isExpanded ? 'pi pi-arrow-left' : 'pi pi-arrow-right'"
      severity="secondary"
      @click="sidebarStore.toggleSidebar"
    />

    <div class="w-full flex flex-col gap-2">
      <SidebarButton
        v-for="item in menuItems"
        :icon="item.icon"
        :label="isExpanded ? item.label : ''"
        :route="item.route"
      />
    </div>
  </aside>
</template>

<script setup>
  import { useSidebarStore } from '@/shared/model/stores/sidebar'
  import { SidebarButton } from '@/shared/ui/buttons'
  import { PrimeIcons } from '@primevue/core/api'
  import { computed } from 'vue'

  const sidebarStore = useSidebarStore()
  const isExpanded = computed(() => sidebarStore.isExpanded)

  const menuItems = [
    {
      label: 'Poems',
      icon: PrimeIcons.FILE,
      route: '/poems',
    },
    {
      label: 'Authors',
      icon: PrimeIcons.USERS,
      route: '/authors',
    },
  ]
</script>
