import { create } from 'axios'

export class UserAPI {
  constructor() {
    this.api = create({
      baseURL: '/api/user',
      timeout: 5000,
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  // Folders
  fetchFolders = async () => this.api.get('/folder')
  addFolder = async (name) => this.api.post('/folder', { name })
  updateFolder = async (id, name) => this.api.post('/folder/' + id, { name })
  deleteFolder = async (id) => this.api.delete('/folder/' + id)

  // Links
  fetchAllItems = async () => this.api.get('/link')
  addItem = async (url) => this.api.post('/link', { url })
  deleteItem = async (id) => this.api.delete('/link/' + id)
  updateItemStatus = async (id, payload) => this.api.patch('/link/' + id, payload)
  updateItemContent = async (id, content) => this.api.put('/link/' + id, content)
  searchItems = async (searchPattern) => this.api.get('/items/?search=' + searchPattern)
}
