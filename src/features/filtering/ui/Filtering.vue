<template>
  <form
    :name="pageId"
    class="pt-2 flex items-end gap-4 w-full"
    @submit="onFormSubmit"
  >
    <Fluid class="flex gap-4">
      <component
        :is="getInputComponent(field.type)"
        v-for="field in filtersList"
        :key="field.name"
        v-model="form[field.name]"
        :name="field.name"
        :label="field.label"
        v-bind="field.componentAttrs"
      />
    </Fluid>

    <Button type="submit" label="Search" class="h-full">
      <template #icon>
        <FontAwesomeIcon :icon="faSearch" />
      </template>
    </Button>
  </form>
</template>

<script setup></script>
