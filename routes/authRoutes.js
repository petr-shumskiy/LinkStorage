const express = require('express')
const router = express.Router()
const { validateRegistrationData } = require('../middlewares')
const authController = require('../controllers/authController')

router.post(
  '/registration',
  validateRegistrationData,
  authController.registration
)
router.post('/validate-email/:token', authController.validateEmail)
router.post('/login', authController.login)

module.exports = router
