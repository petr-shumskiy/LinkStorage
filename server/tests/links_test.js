const app = require('../index')
const { expect } = require('chai')
const request = require('supertest')(app)
// const constants = require('../constants')
const mongoose = require('mongoose')
const config = require('config')
const User = require('../models/User')
const MONGO_URI = config.get('mongoURI')
const MONGO_OPTIONS = config.get('mongoOptions')
const JWT_SECRET = process.env.JWT_SECRET
const LINK_PATH = '/api/user/link'
const jwt = require('jsonwebtoken')
describe('Links', () => {
  const email = 'testUser'
  const password = 'testUser'
  const token = jwt.sign({ email: 'testUser' }, JWT_SECRET, {
    expiresIn: '10min'
  })
  const bearerToken = `Bearer ${token}`
  const linkId = '5fd106f031ac566c766bce2b'
  const items = [
    { url: 'https://test.com/', _id: mongoose.Types.ObjectId(linkId) },
    { url: 'https://test2.org/' },
    { url: 'https://test3.net/' },
    { url: 'https://test4.net/' }
  ]
  const linksUrls = [
    'https://github.com/',
    'https://reactjs.org/',
    'https://nodejs.org/en/',
    'https://www.npmjs.com/package/react-tiny-link/',
    'https://www.youtube.com/watch?v=DWcJFNfaw9c&ab_channel=ChilledCow/'
  ]
  before(async () => {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS)

    const testUser = new User({ email, password, items })
    await testUser.save()
  })

  describe('get links', () => {
    it('should return list list of items to authorized user', async () => {
      const token = jwt.sign({ email: 'testUser' }, JWT_SECRET, {
        expiresIn: '10min'
      })

      const response = await request
        .get(LINK_PATH)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eql(200)
    })
  })

  describe('check auth', () => {
    it('sould return error for unauthorized user', async () => {
      const response = await request.get(LINK_PATH)
      expect(response.status).to.eql(403)
      expect(response.body.message).to.eql('no authorization')
    })

    it('should return error for user with invalid token', async () => {
      const token = jwt.sign({ email: 'testUser' }, config.get('secretKey'), {
        expiresIn: '10min'
      })
      const response = await request
        .get(LINK_PATH)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eql(403)
      expect(response.body.message).to.eql('illigal token')
    })
  })

  describe('add new link', () => {
    linksUrls.forEach((url) => {
      it(`${url}`, async () => {
        const response = await request
          .post(LINK_PATH)
          .send({ url })
          .set('Authorization', bearerToken)
        expect(response.status).to.eql(204)
      })
    })
  })

  describe('delete link', () => {
    it('items should decrease by link with specific id', async () => {
      const response = await request
        .delete(`${LINK_PATH}/${linkId}`)
        .send({ email })
        .set('Authorization', bearerToken)

      expect(response.status).to.eql(204)
      const user = await User.findOne({ email: 'testUser' })
      expect(user.items.length).to.eql(items.length + linksUrls.length - 1)
    })
  })

  after(async () => {
    await mongoose.connection.db.collection('users').drop()
    await mongoose.connection.close()
  })
})
