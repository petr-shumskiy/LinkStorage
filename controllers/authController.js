const constants = require('../constants')
const User = require('../models/User')
const mailgun = require('mailgun-js')
const jwt = require('jsonwebtoken')
const config = require('config')
const axios = require('axios')
const bcrypt = require('bcryptjs')

const CLIENT_URL = config.get('clientUrl')
const JWT_SECRET = process.env.JWT_SECRET

exports.registration = async (req, res) => {
  const MAILGUN_API_KEY = process.env.MAIL_GUN_API_KEY
  const DOMAIN = process.env.DOMAIN

  try {
    const { email, password } = req.body
    const candidate = await User.findOne({ email })
    if (candidate) {
      return res
        .status(400)
        .json({ message: constants.REGISTRATION_ERROR_USER_EXISTS })
    }

    const activationToken = jwt.sign({ email, password }, JWT_SECRET, {
      expiresIn: '10min'
    })
    const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: DOMAIN })
    try {
      mg.messages().send({
        from: 'no-reply@linkStorage.org',
        to: email,
        subject: 'Activation link',
        html: `
      <h2>Please click on given link to activate your account</h2>
      <a href="${CLIENT_URL}/api/auth/validate-email/${activationToken}"><button>confirm email</button></a>
      `
      })
    } catch (e) {
      console.log(e)
    }
    return res
      .status(200)
      .json({ message: constants.REGISTRATION_SUCCESS_UNCONFIRMED_EMAIL })
  } catch (error) {
    console.log(error)
    res.send({ message: 'error while sending confirmation code' })
  }
}

exports.validateEmail = async (req, res) => {
  try {
    const { token } = req.params
    console.log(token)
    const { email, password } = jwt.verify(token, JWT_SECRET)
    const hashedPassword = await bcrypt.hash(password, 1)
    const user = new User({ email, password: hashedPassword })
    await user.save()
    //  authorization after successful registration
    return await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
      isConfirmation: true
    })
  } catch (error) {
    console.log(error.response || error)
    return res
      .status(400)
      .json({ message: constants.REGISTRATION_ERROR_EMAIL_CONFIRMATION })
  }
}

exports.login = async (req, res, next) => {
  try {
    console.log(req.body)
    const { email, password, isConfirmation } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(400)
        .json({ message: constants.LOGIN_ERROR_INCORRECT_DATA })
    }

    const matchPasswords = await bcrypt.compare(password, user.password)
    if (!matchPasswords) {
      return res
        .status(400)
        .json({ message: constants.LOGIN_ERROR_INCORRECT_DATA })
    }

    const token = jwt.sign({ email, password }, JWT_SECRET, { expiresIn: '1h' })

    if (isConfirmation) {
      // return res.redirect(301, `http://localhost:3000/auth/${token}`)
      return res.status(301).redirect('http://nodejs.org')
    }

    res.status(201).json({ token })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: constants.LOGIN_ERROR_SERVER })
  }
}
