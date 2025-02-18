<template>
  <div
    class="p-10 h-max w-full flex flex-col justify-center tablet:bg-white tablet:shadow-sm tablet:h-max tablet:py-10 tablet:px-16 tablet:rounded-xl laptop:px-20 laptop:py-10"
  >
    <span class="text-primary-900 text-center text-4xl font-bold mb-10"
      >Log In</span
    >

    <Message
      v-if="isError && error.status === 500"
      severity="error"
      class="my-r"
    >
      Server is probably down, please try again later.

      <template #icon>
        <FontAwesomeIcon :icon="faCircleXmark" />
      </template>
    </Message>
    <Message v-else-if="isError" severity="error" class="my-4">
      <span v-for="error in error.response.data.errors">{{ error }}</span>

      <template #icon>
        <FontAwesomeIcon :icon="faCircleXmark" />
      </template>
    </Message>

    <form name="login" class="flex flex-col" @submit.prevent="onFormSubmit">
      <Fluid class="flex flex-col gap-4">
        <ValidatedInputText
          key="email"
          name="email"
          label="Email"
          type="email"
        />
        <ValidatedInputPassword
          key="password"
          name="password"
          label="Password"
          :feedback="false"
          toggle-mask
        />

        <Button
          label="Login"
          class="mt-4"
          type="submit"
          :disabled="isPending"
        />

        <Button
          label="Forgot password?"
          as="router-link"
          to="/"
          severity="secondary"
          variant="link"
        />
      </Fluid>
    </form>

    <Divider align="center" type="solid" class="mb-8 mt-6">OR</Divider>

    <div class="flex flex-col gap-4 justify-center">
      <Button label="Log In with Google" variant="outlined">
        <template #icon>
          <FontAwesomeIcon :icon="faGoogle"></FontAwesomeIcon>
        </template>
      </Button>
      <Button label="Log In with GitHub" variant="outlined">
        <template #icon>
          <FontAwesomeIcon :icon="faGithub"></FontAwesomeIcon>
        </template>
      </Button>

      <div class="flex items-center justify-center mt-8">
        <span class="text-primary text-md"> Don't have an account yet? </span>
        <Button
          label="Register"
          as="router-link"
          to="/register"
          variant="link"
          class="text-primary"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { object, string } from 'yup'
  import { useForm } from 'vee-validate'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
  import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
  import { useLoginMutation } from '../api/useLoginMutation'
  import {
    ValidatedInputPassword,
    ValidatedInputText,
  } from '@/shared/ui/inputs'

  const initialValues = ref({
    email: '',
    password: '',
  })

  const schema = object({
    email: string().required().email(),
    password: string().required(),
  })

  const { handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: initialValues,
  })

  const {
    mutate: mutateUserLogin,
    isPending,
    isError,
    error,
  } = useLoginMutation()

  const onFormSubmit = handleSubmit((values) => {
    mutateUserLogin(values)
  })
</script>
