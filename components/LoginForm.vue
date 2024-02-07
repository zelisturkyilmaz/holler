<script setup>
const loginSchema = ref({
  email: 'required|email',
  password: 'required|min:8|max:100',
})

const auth = useAuthStore()
const modal = useModalStore()

const login_in_submission = ref(false)
const login_show_alert = ref(false)
const login_alert_variant = ref('bg-blue-500')
const login_alert_msg = ref('Please wait! Your account is being created.')

async function login(values, { resetForm }) {
  login_show_alert.value = true
  login_in_submission.value = true
  login_alert_variant.value = 'bg-blue-500'
  login_alert_msg.value = 'Please wait! We are logging you in.'

  try {
    await auth.signInUser(values)
  }
  catch (error) {
    login_in_submission.value = false
    login_alert_variant.value = 'bg-red-500'
    login_alert_msg.value = 'Invalid login details.'
    return
  }

  login_alert_variant.value = 'bg-green-500'
  login_alert_msg.value = 'Success! You are now logged in.'
  setTimeout(() => {}, 3000)
  modal.hideModal()
  resetForm()
}
</script>

<template>
  <div>
    <div
      v-if="login_show_alert"
      class="text-white text-center font-bold p-4 mb-4"
      :class="login_alert_variant"
    >
      {{ login_alert_msg }}
    </div>
    <VeeForm :validation-schema="loginSchema" @submit="login">
      <div class="mb-3">
        <label class="mb-2 inline-block">Email</label>
        <VeeField
          name="email" type="email"
          class="block w-full border border-gray-400 rounded p-2 text-gray-800 focus:outline-none focus:border-black"
          placeholder="Enter Email"
        />
        <VeeErrorMessage name="email" class="text-red-600" />
      </div>
      <div class="mb-3">
        <label class="mb-2 inline-block">Password</label>
        <VeeField
          name="password" type="password"
          class="block w-full border border-gray-400 rounded p-2 text-gray-800 focus:outline-none focus:border-black"
          placeholder="Enter Password"
        />
        <VeeErrorMessage name="password" class="text-red-600" />
      </div>
      <button
        type="submit"
        class="block w-full rounded bg-teal-700 text-white p-2 hover:bg-teal-600"
        :disabled="login_in_submission"
      >
        Submit
      </button>
    </VeeForm>
  </div>
</template>
