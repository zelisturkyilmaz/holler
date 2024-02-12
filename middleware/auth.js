/* eslint-disable curly */
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const allowedRoutes = ['/']
  if (!authStore.user && !allowedRoutes.includes(to.path)) {
    return navigateTo('/')
  }
})
