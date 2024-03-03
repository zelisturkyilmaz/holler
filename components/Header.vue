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
  <div>
    <div v-if="auth.user && !auth.user.emailVerified" class="text-white text-center p-2 bg-yellow-600">
      Please verify your email
    </div>
    <header class="bg-gray-700">
      <nav class="container mx-auto p-4 flex justify-between items-center text-white">
        <NuxtLink class="hover:text-amber-500 hover:transition hover:duration-300 hover:ease-in-out hover:-skew-x-12 font-bold uppercase text-2xl mr-4" to="/">
          Howler
        </NuxtLink>
        <button v-if="!auth.user" class="hover:text-amber-500" @click="modal.showModal()">
          Login / Register
        </button>
        <div v-if="auth.user" class="space-x-8 flex items-center">
          <NuxtLink class="hover:text-amber-500" to="/manage">
            Manage
          </NuxtLink>
          <button class="hover:text-amber-500 p-1" @click="logout">
            Sign Out
          </button>
        </div>
      </nav>
    </header>
  </div>
</template>
