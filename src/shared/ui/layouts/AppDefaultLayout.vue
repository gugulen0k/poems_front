<template>
  <div class="h-full grid grid-cols-[max-content_1fr]">
    <nav>
      <slot name="sidebar"></slot>
    </nav>

    <main class="h-full flex flex-col gap-4 tablet:p-4">
      <!--      <header class="max-h-fit">
        <slot name="header"></slot>
      </header>-->

      <section class="h-full">
        <slot name="content"></slot>
      </section>
    </main>
  </div>
</template>

<script setup></script>
