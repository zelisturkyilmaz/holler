import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const userCred = ref()

  async function createUser(values) {
    const auth = getAuth()

    try {
      userCred.value = await createUserWithEmailAndPassword(auth, values.email, values.password)
    }
    catch (error) {}
  }

  return {
    userCred,
    createUser,
  }
})
