/* eslint-disable node/prefer-global/process */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'nuxt-icon', '@vee-validate/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  runtimeConfig: {
    public: {
      firebase: {
        apiKey: process.env.NUXT_PUBLIC_API_KEY,
        authDomain: process.env.NUXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NUXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NUXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NUXT_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.NUXT_PUBLIC_APP_ID,
      },
    },
  },
})
