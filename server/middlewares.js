const { isEmail } = require('validator')
const passwordStrength = require('check-password-strength')
const constants = require('./constants')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const validateRegistrationData = (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!isEmail(email)) {
      return res
        .status(400)
        .json({ message: constants.REGISTRATION_ERROR_EMAIL_VALIDATION })
    }
    if (passwordStrength(password).value === 'Weak') {
      return res.status(400).json({
        message: constants.REGISTRATION_ERROR_PASSWORD_VALIDATION_WEAK
      })
    }
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'unexected error' })
  }
}

const hasAuth = (req, res, next) => {
  try {
    const bearer = req.headers.authorization

    if (!bearer) {
      return res.status(403).json({ message: 'no authorization' })
    }

    const token = bearer.split(' ')[1]
    const decodeData = jwt.verify(token, JWT_SECRET)
    req.user = decodeData
    console.log(decodeData)
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(403).json({ message: 'illigal token' })
  }
}

module.exports = {
  validateRegistrationData,
  hasAuth
}
