<template>
  <div class="h-full flex flex-col gap-4">
    <header class="max-h-fit">
      <slot name="header"></slot>
    </header>

    <main class="h-full grid grid-cols-[max-content_1fr] pb-4">
      <nav>
        <slot name="sidebar"></slot>
      </nav>
      <section class="px-4">
        <slot name="content"></slot>
      </section>
    </main>
  </div>
</template>

<script setup></script>
