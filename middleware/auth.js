/* eslint-disable curly */
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  if (from.path === '/manage' && !authStore.user && to.path === '/manage') {
    return navigateTo('/')
  }
})
