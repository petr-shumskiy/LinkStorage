const constants = {
  REGISTRATION_ERROR_USER_EXISTS: 'User with this email exists',
  REGISTRATION_ERROR_EMAIL_VALIDATION: 'Incorrect e-mail format',
  REGISTRATION_ERROR_EMAIL_CONFIRMATION: "We can't confirm your email",
  REGISTRATION_SUCCESS_UNCONFIRMED_EMAIL: 'Email was sent',
  REGISTRATION_SUCCESS_CONFIRMED_EMAIL: 'User was succssfully created',
  REGISTRATION_ERROR_PASSWORD_VALIDATION_WEAK: 'The password is too weak',
  LOGIN_ERROR_UNCONFIRMED_EMAIL: 'Confirm email, please',
  LOGIN_ERROR_INCORRECT_DATA: "The email or password isn't correct",
  LOGIN_ERROR_SERVER: 'something wrong with server while logining'
}

module.exports = constants
