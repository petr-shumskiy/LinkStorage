import { isEmail } from 'validator'
import passwordStrength from 'check-password-strength'
export const validateEmailForm = (email) => {
  if (email && !isEmail(email)) {
    return "email isn't valid"
  }
}

export const validatePasswordForm = (password) => {
  if (password && passwordStrength(password).value === 'Weak') {
    return 'password is too weak'
  }
}

export const formRequired = (value) => (value ? undefined : 'required')
