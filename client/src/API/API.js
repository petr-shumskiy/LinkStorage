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
  timeout: 5000,
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
  fetchFolders = async (token) => {
    const response = await userInstance.get('/folder', setHeader(token))
    return response
  }

  addFolder = async (name) => {
    const response = await userInstance.post('/folder', { name })
    return response
  }

  updateFolder = async (id, name) => {
    const response = await userInstance.post('/folder/' + id, { id, name })
    return response
  }

  deleteFolder = async (id) => {
    console.log(id)
    const response = await userInstance.delete('/folder/' + id)
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
    console.log(response)
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
