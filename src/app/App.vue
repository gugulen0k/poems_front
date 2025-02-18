<template>
  <RouterView />

  <VueQueryDevtools />
</template>

<script setup>
  import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<style lang="css">
  html,
  body {
    height: 100%;
  }

  #app {
    height: 100%;
    overflow-y: hidden;
  }

  /** {*/
  /*  outline: 1px solid red;*/
  /*}*/
</style>
