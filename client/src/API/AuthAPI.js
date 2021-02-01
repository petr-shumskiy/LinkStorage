import { create } from 'axios'

export class AuthAPI {
  constructor() {
    this.api = create({
      baseURL: '/api/auth',
      header: { 'Access-Control-Allow-Origin': '*' }
    })
  }

  sendRegistrationData = async ({ url }) => this.api.post('/registration', url)
  sendSignInData = async (data) => await this.api.post('/login', data)
  sendConfirmationRequest = async (token) => this.api.post('/validate-email/' + token)
}
