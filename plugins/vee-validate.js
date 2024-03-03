import { configure, defineRule } from 'vee-validate'
import { alpha_dash, alpha_spaces, confirmed, email, max, min, not_one_of, required } from '@vee-validate/rules'

export default defineNuxtPlugin(() => {
  defineRule('required', required)
  defineRule('email', email)
  defineRule('min', min)
  defineRule('max', max)
  defineRule('alpha_spaces', alpha_spaces)
  defineRule('alpha_dash', alpha_dash)
  defineRule('not_one_of', not_one_of)
  defineRule('confirmed', confirmed)

  configure({
    generateMessage: (ctx) => {
      const messages = {
        required: `Field is required.`,
        min: `The field ${ctx.field} is too short. Should be minimum ${ctx.rule.params} characters`,
        max: `The field ${ctx.field} is too long.`,
        email: `The field ${ctx.field} must be a valid email.`,
        alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
        not_one_of: `You are not allowed to use this value for the field ${ctx.field}.`,
        confirmed: 'The passwords don\'t match.',
        alpha_dash: `The field may contain alphabetic characters, numbers, dashes, or underscores.`,
      }

      const message = messages[ctx.rule.name]
        ? messages[ctx.rule.name]
        : `The field ${ctx.field} is invalid.`

      return message
    },

    validateOnInput: true,
  })
})
