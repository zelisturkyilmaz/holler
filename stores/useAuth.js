import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const nuxtApp = useNuxtApp()

  async function createUser(values) {
    const userCredential = await createUserWithEmailAndPassword(nuxtApp.$auth, values.email, values.password)

    await sendEmailVerification(nuxtApp.$auth.currentUser)

    await setDoc(doc(nuxtApp.$db, 'users', userCredential.user.uid), {
      name: values.name,
      display_name: values.display_name,
      email: values.email,
    })

    await updateProfile(nuxtApp.$auth.currentUser, {
      displayName: values.display_name,
    })

    user.value = userCredential.user
  }

  async function signInUser(values) {
    const userCredential = await signInWithEmailAndPassword(nuxtApp.$auth, values.email, values.password)
    user.value = userCredential.user
  }

  async function signOutUser() {
    await signOut(nuxtApp.$auth)
    user.value = null
  }

  return {
    user,
    createUser,
    signInUser,
    signOutUser,
  }
}, {
  persist: true,
})
