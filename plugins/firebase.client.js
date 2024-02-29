/* eslint-disable curly */
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { firebase } = config.public
  const app = initializeApp({ ...firebase })

  const auth = getAuth(app)
  const db = getFirestore(app)
  const storage = getStorage(app)

  const authStore = useAuthStore()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      authStore.user = user
    }
    else {
      authStore.user = null
    }
  })

  return {
    provide: {
      db,
      auth,
      storage,
    },
  }
})
