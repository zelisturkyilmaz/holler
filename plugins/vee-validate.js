import { configure, defineRule } from 'vee-validate'
import { email, max, min, required } from '@vee-validate/rules'

export default defineNuxtPlugin(() => {
  defineRule('required', required)
  defineRule('email', email)
  defineRule('min', min)
  defineRule('max', max)

  configure({
    generateMessage: (ctx) => {
      const messages = {
        required: `The field ${ctx.field} is required.`,
        min: `The field ${ctx.field} is too short.`,
        max: `The field ${ctx.field} is too long.`,
        email: `The field ${ctx.field} must be a valid email.`,
      }

      const message = messages[ctx.rule.name]
        ? messages[ctx.rule.name]
        : `The field ${ctx.field} is invalid.`

      return message
    },
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
  })
})
