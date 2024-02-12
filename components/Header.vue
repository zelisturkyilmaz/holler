<script setup>
const toggleDropdown = ref(false)
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
          <div class="relative">
            <button class="h-10 w-10 rounded-full ring-2 ring-gray-600 hover:ring-gray-400 bg-gray-500 flex items-center justify-center" @click="toggleDropdown = !toggleDropdown">
              <Icon name="fa-solid:user" />
            </button>
            <div class="absolute right-0 w-32 rounded-md shadow-lg bg-white ring-1 ring-gray-400 ring-opacity-10 p-2 mt-1 text-gray-600 text-center z-50" :class="{ hidden: !toggleDropdown }">
              <NuxtLink class="hover:text-amber-500 block" to="/settings">
                Settings
              </NuxtLink>
              <button class="hover:text-amber-500 p-1" @click="logout">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
