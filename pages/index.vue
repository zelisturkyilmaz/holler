<script setup>
const modal = useModalStore()
</script>

<template>
  <div>
    Main
    <Transition name="modal-fade">
      <AuthModal v-show="modal.show" />
    </Transition>
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
