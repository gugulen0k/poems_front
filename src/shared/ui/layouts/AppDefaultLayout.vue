<template>
  <div class="min-h-full mx-4">
    <header class="max-h-fit">
      <slot name="header"></slot>
    </header>

    <main class="flex">
      <div>
        <slot name="sidebar"></slot>
      </div>
      <div>
        <slot name="content"></slot>
      </div>
    </main>
  </div>
</template>

<script setup></script>
