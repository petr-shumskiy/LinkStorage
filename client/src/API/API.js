// create different apis for different reducers, create instancec of axios
import { create } from 'axios'

const token = localStorage.getItem('token')

function setHeader(token) {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + token
    }
  }
}

const userInstance = create({
  baseURL: '/api/user',
  timeout: 1000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + token
  }
})

const authInstance = create({
  baseURL: '/api/auth',
  header: { 'Access-Control-Allow-Origin': '*' }
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
    const response = await authInstance.post(
      '/validate-email/' + confirmationToken
    )
    return response
  }

  // USER
  fetchFolders = async () => {
    const response = await userInstance.get('/folder')
    return response
  }

  addFolder = async (name) => {
    const response = await userInstance.post('/folder', { name })
    return response
  }

  fetchAllItems = async (token) => {
    const response = await userInstance.get('/link', setHeader(token))
    return response
  }

  addItem = async (item) => {
    const response = await userInstance.post('/link', { item })
    return response
  }

  deleteItem = async (id) => {
    const response = await userInstance.delete('/link/' + id)
    return response
  }

  updateItem = async (id, payload) => {
    const response = await userInstance.patch('/link/' + id, payload)
    return response
  }

  toggleLikeItem = async (id) => {
    const response = await userInstance.post(`/link/${id}/like`)
    return response
  }
}

export default new API()
