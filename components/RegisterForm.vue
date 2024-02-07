<script setup>
const registerSchema = ref({
  name: 'required|min:3|max:100|alpha_spaces',
  email: 'required|min:3|max:100|email',
  password: 'required|min:8|max:100|not_one_of:password',
  confirm_password: 'confirmed:@password',
})

const auth = useAuthStore()
const modal = useModalStore()

const reg_in_submission = ref(false)
const reg_show_alert = ref(false)
const reg_alert_variant = ref('bg-blue-500')
const reg_alert_msg = ref('Please wait! Your account is being created.')

async function register(values, { resetForm }) {
  reg_show_alert.value = true
  reg_in_submission.value = true
  reg_alert_variant.value = 'bg-blue-500'
  reg_alert_msg.value = 'Please wait! Your account is being created.'

  try {
    await auth.createUser(values)
  }
  catch (error) {
    reg_in_submission.value = false
    reg_alert_variant.value = 'bg-red-500'
    reg_alert_msg.value = 'An unexpected error occurred. Please try again later.'
    return
  }

  reg_alert_variant.value = 'bg-green-500'
  reg_alert_msg.value = 'Success! Please verify your email.'
  setTimeout(() => {}, 3000)
  modal.hideModal()
  resetForm()
}
</script>

<template>
  <div>
    <div
      v-if="reg_show_alert"
      class="text-white text-center font-bold p-4 rounded mb-4"
      :class="reg_alert_variant"
    >
      {{ reg_alert_msg }}
    </div>
    <VeeForm :validation-schema="registerSchema" @submit="register">
      <div class="mb-3">
        <label class="mb-2 inline-block">Full Name</label>
        <VeeField
          name="name" type="text"
          class="block w-full border border-gray-400 rounded p-2 text-gray-800 focus:outline-none focus:border-black"
        />
        <VeeErrorMessage name="name" class="text-red-600" />
      </div>
      <div class="mb-3">
        <label class="mb-2 inline-block">Email</label>
        <VeeField
          name="email" type="email"
          class="block w-full border border-gray-400 rounded p-2 text-gray-800 focus:outline-none focus:border-black"
        />
        <VeeErrorMessage name="email" class="text-red-600" />
      </div>

      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <VeeField v-slot="{ field, errors }" name="password" :bails="false">
          <input
            class="block w-full border border-gray-400 rounded p-2 text-gray-800 focus:outline-none focus:border-black"
            type="password"
            v-bind="field"
          />
          <div v-for="error in errors" :key="error" class="text-red-600">
            {{ error }}
          </div>
        </VeeField>
      </div>
      <div class="mb-3">
        <label class="mb-2 inline-block">Confirm Password</label>
        <VeeField
          name="confirm_password" type="password"
          class="block w-full border border-gray-400 rounded p-2 text-gray-800 focus:outline-none focus:border-black"
        />
        <VeeErrorMessage name="confirm_password" class="text-red-600" />
      </div>
      <button
        type="submit"
        class="block w-full rounded bg-teal-700 text-white p-2 hover:bg-teal-600"
        :disabled="reg_in_submission"
      >
        Submit
      </button>
    </VeeForm>
  </div>
</template>
