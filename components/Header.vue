<script setup>
const modal = useModalStore()
</script>

<template>
  <header class="bg-gray-700">
    <nav class="container mx-auto p-4 flex justify-between text-white">
      <NuxtLink class="hover:text-amber-500 hover:transition hover:duration-300 hover:ease-in-out hover:-skew-x-12 font-bold uppercase text-2xl mr-4" to="/">
        Howler
      </NuxtLink>
      <button class="hover:text-amber-500" @click="modal.showModal()">
        Login / Register
      </button>
    </nav>
  </header>
</template>
