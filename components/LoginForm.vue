<script setup>
const loginSchema = ref({
  email: 'required|email',
  password: 'required|min:8|max:100',
})

function login(values) {
  console.log(values)
}
</script>

<template>
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
    >
      Submit
    </button>
  </VeeForm>
</template>
