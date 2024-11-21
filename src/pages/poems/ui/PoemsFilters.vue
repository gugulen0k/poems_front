<template>
  <Panel header="Filters" toggleable>
    <Form
      v-slot="$form"
      :initial-values
      :resolver="resolver"
      class="flex gap-4 w-full"
      @submit="onFormSubmit"
    >
      <Fluid class="flex gap-4">
        <div>
          <InputText name="title" type="text" placeholder="Title" fluid />
          <Message
            v-if="$form.title?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.title.error.message }}</Message
          >
        </div>
        <div>
          <InputText name="author" type="text" placeholder="Author" fluid />
          <Message
            v-if="$form.author?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.author.error.message }}</Message
          >
        </div>
        <div>
          <DatePicker name="release-date" placeholder="Release Date" fluid />
          <Message
            v-if="$form.releaseDate?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.releaseDate.error.message }}</Message
          >
        </div>
      </Fluid>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </Panel>
</template>

<script setup>
  import { Form } from '@primevue/forms'
  import { ref } from 'vue'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  import { z } from 'zod'

  const initialValues = ref({
    title: '',
    author: '',
    releaseDate: '',
  })

  const resolver = ref(
    zodResolver(
      z.object({
        title: z.string(),
        author: z.string(),
        releaseDate: z.string().date(),
      })
    )
  )

  const onFormSubmit = ({ valid }) => {
    if (valid) console.log('Submitted!')
  }
</script>
