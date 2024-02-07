import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const userLoggedIn = ref(false)

  async function createUser(values) {
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)
      user.value = userCredential.user
      userLoggedIn.value = true
      await sendEmailVerification(auth.currentUser)
    }
    catch (error) {}
  }

  async function signInUser(values) {
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password)
      user.value = userCredential.user
      userLoggedIn.value = true
    }
    catch (error) {}
  }

  async function signOutUser() {
    const auth = getAuth()
    await signOut(auth)
    user.value = null
    userLoggedIn.value = false
  }

  return {
    user,
    userLoggedIn,
    createUser,
    signInUser,
    signOutUser,
  }
}, {
  persist: true,
})
