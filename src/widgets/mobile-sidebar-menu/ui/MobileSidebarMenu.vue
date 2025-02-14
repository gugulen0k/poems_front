<template>
  <div class="card flex justify-center">
    <Drawer v-model:visible="visibility" position="right">
      <template #container="{ closeCallback }">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between px-6 pt-4 shrink-0">
            <span class="inline-flex items-center gap-2">
              <FontAwesomeIcon :icon="faScroll" class="text-2xl" />
              <span class="font-semibold text-2xl text-primary">VerseNest</span>
            </span>
            <span>
              <Button
                type="button"
                icon="pi pi-times"
                rounded
                outlined
                @click="closeCallback"
              />
            </span>
          </div>

          <div class="my-auto flex flex-col gap-4 px-4">
            <Button
              v-for="item in menuItems"
              :key="item.label"
              :class="[
                activeItem === item.label
                  ? 'bg-primary-100 text-primary-800'
                  : '',
                'transition-all ease-out duration-200',
              ]"
              :aria-label="item.label"
              :to="item.route"
              :label="item.label"
              as="router-link"
              fluid
              @click="updateSidebarState(item.label)"
            >
              <template #icon>
                <FontAwesomeIcon :icon="item.icon" class="text-xl" />
              </template>
            </Button>
          </div>
        </div>

        <div class="border-t mx-4 p-0">
          <Button
            class="my-4 text-lg"
            variant="text"
            severity="secondary"
            fluid
            as="router-link"
            to="/login"
          >
            <template #default>
              <FontAwesomeIcon :icon="faUser" />
              <span>John Doe</span>
            </template>
          </Button>
        </div>
      </template>
    </Drawer>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faScroll, faUser } from '@fortawesome/free-solid-svg-icons'
  import { useSidebarStore } from '@/shared/model/stores/useSidebarStore'
  import { menuItems } from '@/shared/lib/menuItems'

  const visibility = defineModel()
  const sidebarStore = useSidebarStore()
  const activeItem = computed(() => sidebarStore.activeItem)
  const updateSidebarState = (label) => {
    sidebarStore.setActiveItem(label)
  }
</script>
