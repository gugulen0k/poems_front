<template>
  <div
    class="h-full px-10 bg-white shadow-sm flex flex-col justify-center tablet:h-max tablet:py-10 tablet:px-16 tablet:rounded-xl laptop:px-20 laptop:py-10"
  >
    <span class="text-primary-900 text-center text-4xl font-bold mb-10"
      >Register</span
    >

    <Message v-if="isError" severity="error" class="my-4">
      <span v-for="error in error.response.data.errors">{{ error }}</span>

      <template #icon>
        <FontAwesomeIcon :icon="faCircleXmark" />
      </template>
    </Message>

    <form
      name="login"
      class="flex flex-col"
      @submit.prevent="onFormSubmit"
      @keyup.enter.prevent="onFormSubmit"
    >
      <Fluid class="flex flex-col gap-4 tablet:grid tablet:grid-cols-2">
        <ValidatedInputText
          key="email"
          name="email"
          label="Email"
          type="email"
        />
        <ValidatedInputText key="nickname" name="nickname" label="Nickname" />
        <ValidatedInputPassword
          key="password"
          name="password"
          label="Password"
          :feedback="false"
          toggle-mask
        />
        <ValidatedInputPassword
          key="confirm_password"
          name="confirm_password"
          label="Confirm password"
          :feedback="false"
          toggle-mask
        />

        <Button label="Sign Up" class="mt-4 col-span-2" type="submit" />
      </Fluid>
    </form>

    <Divider align="center" type="solid" class="my-8">OR</Divider>

    <div class="flex flex-col gap-4 justify-center">
      <Button label="Sign up with Google" variant="outlined">
        <template #icon>
          <FontAwesomeIcon :icon="faGoogle"></FontAwesomeIcon>
        </template>
      </Button>
      <Button label="Sign up with GitHub" variant="outlined">
        <template #icon>
          <FontAwesomeIcon :icon="faGithub"></FontAwesomeIcon>
        </template>
      </Button>

      <div class="flex items-center justify-center mt-8">
        <span class="text-primary text-md">Already have an account?</span>
        <Button
          label="Log In"
          as="router-link"
          to="/login"
          variant="link"
          class="text-primary"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { object, string, ref as yupRef } from 'yup'
  import { useForm } from 'vee-validate'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
  //import { useUserMutation } from '../api/useUserMutation'
  import {
    ValidatedInputPassword,
    ValidatedInputText,
  } from '@/shared/ui/inputs'
  import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

  const initialValues = ref({
    email: '',
    password: '',
  })

  const schema = object({
    email: string().required('* required').email(),
    nickname: string().max(64),
    password: string().required('* required').min(6),
    confirm_password: string()
      .required('* required')
      .oneOf([yupRef('password')], 'Passwords must match'),
  })

  const { handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: initialValues,
  })

  //const { mutate: mutateUser, isError, error } = useUserMutation()

  const onFormSubmit = handleSubmit((values) => {
    //mutateUser(values)
  })
</script>
