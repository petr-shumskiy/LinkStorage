import { create } from 'axios'

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
    'Access-Control-Allow-Origin': '*'
  }
})

const authInstance = create({
  baseURL: '/api/auth',
  header: { 'Access-Control-Allow-Origin': '*' }
})

class API {
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

  addFolder = async (token, name) => {
    console.log(token)
    const response = await userInstance.post(
      '/folder',
      { name },
      setHeader(token)
    )
    return response
  }

  updateFolder = async (token, id, name) => {
    const response = await userInstance.post(
      '/folder/' + id,
      { id, name },
      setHeader(token)
    )
    return response
  }

  deleteFolder = async (token, id) => {
    const response = await userInstance.delete(
      '/folder/' + id,
      setHeader(token)
    )
    return response
  }

  fetchAllItems = async (token) => {
    const response = await userInstance.get('/link', setHeader(token))
    return response
  }

  addItem = async (token, url) => {
    console.log(url)
    const response = await userInstance.post('/link', { url }, setHeader(token))
    return response
  }

  deleteItem = async (token, id) => {
    const response = await userInstance.delete('/link/' + id, setHeader(token))
    return response
  }

  updateItemStatus = async (token, id, payload) => {
    const response = await userInstance.patch(
      '/link/' + id,
      payload,
      setHeader(token)
    )
    return response
  }

  updateItemContent = async (token, id, content) => {
    const response = await userInstance.put(
      '/link/' + id,
      content,
      setHeader(token)
    )
    return response
  }

  searchItems = async (token, searchPattern) => {
    const response = await userInstance.get(
      '/items/?search=' + searchPattern,
      setHeader(token)
    )
    return response
  }
}

export default new API()
