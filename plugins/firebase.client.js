import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  const { firebase } = config.public
  const app = initializeApp({ ...firebase })
  const auth = getAuth(app)
  const authStore = useAuthStore()

  const startAuthListener = () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          authStore.user = user
          authStore.userLoggedIn = true
          resolve(null)
        }
        else {
          authStore.user = null
          authStore.userLoggedIn = false
          resolve(null)
        }
      })
    })
  }

  await startAuthListener()

  return {
    provide: {
      auth,
    },
  }
})
