import { configure, defineRule } from 'vee-validate'
import { alpha_spaces, confirmed, email, max, min, not_one_of, required } from '@vee-validate/rules'

export default defineNuxtPlugin(() => {
  defineRule('required', required)
  defineRule('email', email)
  defineRule('min', min)
  defineRule('max', max)
  defineRule('alpha_spaces', alpha_spaces)
  defineRule('not_one_of', not_one_of)
  defineRule('confirmed', confirmed)

  configure({
    generateMessage: (ctx) => {
      const messages = {
        required: `The field ${ctx.field} is required.`,
        min: `The field ${ctx.field} is too short.`,
        max: `The field ${ctx.field} is too long.`,
        email: `The field ${ctx.field} must be a valid email.`,
        alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
        not_one_of: `You are not allowed to use this value for the field ${ctx.field}.`,
        confirmed: 'The passwords don\'t match.',
      }

      const message = messages[ctx.rule.name]
        ? messages[ctx.rule.name]
        : `The field ${ctx.field} is invalid.`

      return message
    },

    validateOnInput: true,
  })
})
