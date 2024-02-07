/* eslint-disable curly */
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  if (!authStore.user && to.path === '/manage') {
    return navigateTo('/')
  }
})
