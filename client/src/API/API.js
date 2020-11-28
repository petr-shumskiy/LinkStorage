import { post } from 'axios'
class API_ {
  sendRegistrationData = async (data) => {
    const response = await post(
      'http://localhost:5000/api/auth/registration',
      data
    )
    return response
  }

  sendSignInData = async (data) => {
    const response = await post('http://localhost:5000/api/auth/login', data)
    return response
  }
}

export const API = new API_()
