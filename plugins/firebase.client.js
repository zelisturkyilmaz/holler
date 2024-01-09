import { initializeApp } from 'firebase/app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { firebase } = config.public
  const app = initializeApp({ ...firebase })
})
