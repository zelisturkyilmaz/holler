<script setup>
const modal = useModalStore()
</script>

<template>
  <div>
    <Transition name="modal-fade">
      <AuthModal v-show="modal.show" />
    </Transition>
    <NuxtLayout>
      <NuxtPage  />
    </NuxtLayout>
  </div>
</template>

<style scoped>
.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity .5s;
}
</style>
