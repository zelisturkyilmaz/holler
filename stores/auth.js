import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const userCredential = ref()

  async function createUser(email, password) {
    const auth = getAuth()
    try {
      userCredential.value = await createUserWithEmailAndPassword(auth, email, password)
    }
    catch (error) {
      console.log(error)
    }
    return userCredential
  }

  return {
    userCredential,
    createUser,
  }
})
