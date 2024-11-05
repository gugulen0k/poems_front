<template>
  <div class="min-h-full mx-4">
    <header class="max-h-fit">
      <slot name="header"></slot>
    </header>

    <div class="min-h-full my-4 p-4 rounded-2xl bg-slate-100">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup></script>
