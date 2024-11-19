<template>
  <div class="min-h-full bg-primary-50 px-4 flex items-center rounded-r-lg">
    <div class="flex flex-col justify-center gap-4">
      <Button
        v-for="item in menuItems"
        :key="item.label"
        :class="[
          activeItem === item.label ? 'bg-primary-300' : '',
          isOpen ? 'flex justify-start w-full' : '',
        ]"
        :aria-label="item.label"
        :to="item.route"
        as="router-link"
        fluid
        @click="updateSidebarState(item.label)"
      >
        <template #default>
          <div
            :class="
              isOpen &&
              'w-full grid gap-2 grid-cols-[max-content_1fr] items-center'
            "
          >
            <FontAwesomeIcon :icon="item.icon" />
            <span v-if="isOpen" class="text-center">{{ item.label }}</span>
          </div>
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { useSidebarStore } from '@/shared/model/stores/useSidebarStore'
  import { menuItems } from '../lib/menuItems'

  const sidebarStore = useSidebarStore()
  const isOpen = computed(() => sidebarStore.isOpen)
  const activeItem = computed(() => sidebarStore.activeItem)
  const updateSidebarState = (label) => {
    sidebarStore.setActiveItem(label)
  }
</script>
