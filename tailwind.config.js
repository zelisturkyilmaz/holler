/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      keyframes: {
        slide: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '-5000px 0' },
        },
      },
      animation: {
        slide: 'slide 50s linear infinite'
      }
    },
  },
  plugins: ['daisyui'],
  daisyui: {
    themes: ['light'],
  },
}
