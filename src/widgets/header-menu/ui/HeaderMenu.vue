<template>
  <Menubar
    :model="items"
    class="px-0 rounded-none bg-transparent border-none"
    breakpoint="640px"
    :pt="menubarStyles"
  >
    <template #start>
      <Button
        to="/poems"
        as="router-link"
        severity="secondary"
        size="large"
        class="hidden tablet:block"
      >
        <span class="text-xl font-bold">VerseNest</span>
      </Button>
    </template>

    <template #item="{ item, props, hasSubmenu }">
      <RouterLink
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </a>
      </RouterLink>

      <a
        v-else
        v-ripple
        :href="item.url"
        :target="item.target"
        v-bind="props.action"
      >
        <span :class="item.icon" />
        <span>{{ item.label }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
      </a>
    </template>

    <template #end>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-4">
          <Avatar icon="pi pi-user" size="large" />
        </div>
      </div>
    </template>
  </Menubar>
</template>

<script setup>
  import { ref } from 'vue'

  import { PrimeIcons } from '@primevue/core/api'

  const items = ref([
    {
      label: 'Poems',
      icon: PrimeIcons.FILE,
      items: [
        {
          label: 'All Poems',
          route: '/poems',
        },
        {
          label: 'Random Poem',
          route: '/poems/:id',
        },
      ],
    },
    {
      label: 'Authors',
      icon: PrimeIcons.USERS,
      items: [
        {
          label: 'All Authors',
          route: '/authors',
        },
        {
          label: 'Random Author',
          route: '/authors/:id',
        },
      ],
    },
  ])

  const menubarStyles = {
    rootList: {
      class: 'tablet:m-auto',
    },
    end: {
      class: 'tablet:m-0',
    },
  }
</script>
