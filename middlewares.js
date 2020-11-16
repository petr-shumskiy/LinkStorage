const { isEmail } = require('validator')
const passwordStrength = require('check-password-strength')
const constants = require('./constants')

const validateRegistrationData = (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!isEmail(email)) {
      return res.status(400).json({ message: constants.REGISTRATION_ERROR_EMAIL_VALIDATION })
    }
    if (passwordStrength(password).value === 'Weak') {
      return res.status(400).json(
        { message: constants.REGISTRATION_ERROR_PASSWORD_VALIDATION_WEAK }
      )
    }
    next()
  } catch (error) {
    console.log('Error while registration')
    console.log(error)
  }
}

module.exports = {
  validateRegistrationData
}
