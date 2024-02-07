<script setup>
const modal = useModalStore()
const auth = useAuthStore()

async function logout() {
  try {
    await auth.signOutUser()
    window.location.reload()
  }
  catch (error) {}
}
</script>

<template>
  <header class="bg-gray-700">
    <nav class="container mx-auto p-4 flex justify-between text-white">
      <NuxtLink class="hover:text-amber-500 hover:transition hover:duration-300 hover:ease-in-out hover:-skew-x-12 font-bold uppercase text-2xl mr-4" to="/">
        Howler
      </NuxtLink>
      <NuxtLink v-show="auth.userLoggedIn" class="hover:text-amber-500" to="/manage">
        Manage
      </NuxtLink>
      <button v-show="!auth.userLoggedIn" class="hover:text-amber-500" @click="modal.showModal()">
        Login / Register
      </button>
      <button v-show="auth.userLoggedIn" class="hover:text-amber-500" @click="logout">
        Sign Out
      </button>
    </nav>
  </header>
</template>
