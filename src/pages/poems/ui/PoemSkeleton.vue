<template>
  <Card pt:subtitle:class="text-right">
    <template #title>
      <Skeleton height="2rem" />
    </template>

    <template #subtitle>
      <Skeleton width="10rem" class="float-right" />
    </template>

    <template #content>
      <Skeleton height="4rem" />
    </template>

    <template #footer>
      <div class="flex gap-4 min-w-full">
        <Button icon="pi pi-heart" severity="danger" outlined />
        <Button label="Read" severity="secondary" outlined class="flex-1" />
      </div>
    </template>
  </Card>
</template>

<script setup></script>
