<template>
  <nav class="py-2 px-4">
    <div class="flex items-center">
      <div class="m-auto">
        <Button text>
          <span class="text-xl font-semibold">VerseNest</span>
        </Button>
      </div>
      <div class="">
        <Avatar size="large" shape="circle">
          <template #icon>
            <FontAwesomeIcon class="text-slate-600" :icon="faUser" />
          </template>
        </Avatar>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faUser } from '@fortawesome/free-solid-svg-icons'
</script>
