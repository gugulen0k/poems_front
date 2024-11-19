<template>
  <Card>
    <template #default>
      <Form
        v-slot="$form"
        :initial-values
        :resolver="resolver"
        class="flex flex-col gap-4 w-full sm:w-56"
        @submit="onFormSubmit"
      >
        <div class="flex flex-col gap-1">
          <InputText name="username" type="text" placeholder="Username" fluid />
          <Message
            v-if="$form.username?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.username.error.message }}</Message
          >
        </div>
        <Button type="submit" severity="secondary" label="Submit" />
      </Form>
    </template>
  </Card>
</template>

<script setup>
  import { Form } from '@primevue/forms'
  import { ref } from 'vue'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  import { z } from 'zod'

  const initialValues = ref({
    title: '',
    author: '',
    releaseDate: null,
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
