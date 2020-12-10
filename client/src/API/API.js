// create different apis for different reducers, create instancec of axios
import { create } from 'axios'

const addAuthHeader = (token) => ({ Authorization: `Bearer ${token}` })

const userInstance = create({
  baseURL: 'http://localhost:5000/api/user'
  // timeout: 1000,
  // headers: { Authorization: 'Bearer' + token }
})

const authInstance = create({
  baseURL: 'http://localhost:5000/api/auth'
})

// FIXME catch errors
class API {
  // AUTH
  sendRegistrationData = async ({ url }) => {
    const response = await authInstance.post('/registration', url)
    return response
  }

  sendSignInData = async (data) => {
    const response = await authInstance.post('/login', data)
    return response
  }

  sendConfirmationRequest = async (confirmationToken) => {
    const response = await authInstance.post('/validate-email/' + confirmationToken)
    return response
  }

  // USER
  addItem = async (url, token) => {
    const response = await userInstance.post('/link', url, addAuthHeader(token))
    return response
  }

  deleteItem = async (id, token) => {
    const response = await userInstance.delete('/link', id, addAuthHeader(token))
    return response
  }
}

export default new API()
