export const useModalStore = defineStore('modal', {
  state: () => {
    return {
      show: false,
    }
  },
  getters: {},
  actions: {
    showModal() {
      this.show = true
    },
    hideModal() {
      this.show = false
    },
  },
})
