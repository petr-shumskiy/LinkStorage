export type State = {
  isEmailSended: boolean
  validationError: null | string,
  showRegistration: boolean,
  showSignIn: boolean,
  email: null | string,
  token: null | string,
  signInRequestInProgress: boolean,
  signUpRequestInProgress: boolean
}
