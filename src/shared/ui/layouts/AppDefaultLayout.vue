<template>
  <div class="h-full">
    <header class="max-h-fit">
      <slot name="header"></slot>
    </header>

    <div class="min-h-full flex m-4 p-4 rounded-2xl bg-slate-100">
      <ScrollPanel class="min-w-full"><slot name="content"></slot></ScrollPanel>
    </div>
  </div>
</template>

<script setup></script>
