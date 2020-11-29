import { post } from 'axios'
const BASE_URL = 'http://localhost:5000/api/auth/'
// FIXME catch errors
class _API {
  sendRegistrationData = async (data) => {
    const response = await post(BASE_URL + 'registration', data)
    return response
  }

  sendSignInData = async (data) => {
    const response = await post(BASE_URL + 'login', data)
    return response
  }

  sendConfirmationRequest = async (confirmationToken) => {
    try {
      const response = await post(
        BASE_URL + 'validate-email/' + confirmationToken
      )
      return response.status
    } catch (error) {
      console.log(error)
    }
  }
}

export const API = new _API()
