export const useModalStore = defineStore('modal', () => {
  const show = ref(false)
  function showModal() {
    show.value = true
  }
  function hideModal() {
    show.value = false
  }

  return {
    show,
    showModal,
    hideModal,
  }
})
