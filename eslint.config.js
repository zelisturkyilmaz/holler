import antfu from '@antfu/eslint-config'

export default antfu({
  vue: {
    overrides: {
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],
    },
  },
})
