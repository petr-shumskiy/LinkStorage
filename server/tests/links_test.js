/* eslint-disable no-unused-expressions */
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
const token = jwt.sign({ email: 'testUser' }, JWT_SECRET, {
  expiresIn: '10min'
})
describe('Links', function () {
  const email = 'testUser'
  const password = 'testUser'
  const bearerToken = `Bearer ${token}`
  const linkIdDeleted = '5fd106f031ac566c766bce2b'
  const linkIdUpdated = '5fd36752277e204b56468ec4'
  const items = [
    { url: 'https://test.com/', _id: mongoose.Types.ObjectId(linkIdDeleted) },
    { url: 'https://test2.org/', _id: mongoose.Types.ObjectId(linkIdUpdated) },
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
  before(async function () {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS)

    const testUser = new User({ email, password, items })
    await testUser.save()
  })

  describe('get links', function () {
    it('should return list list of items to authorized user', async function () {
      const token = jwt.sign({ email: 'testUser' }, JWT_SECRET, {
        expiresIn: '10min'
      })

      const response = await request
        .get(LINK_PATH)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eql(200)
    })
  })

  describe('check auth', function () {
    it('sould return error for unauthorized user', async function () {
      const response = await request.get(LINK_PATH)
      expect(response.status).to.eql(403)
      expect(response.body.message).to.eql('no authorization')
    })

    it('should return error for user with invalid token', async function () {
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

  describe('add new link', function () {
    linksUrls.forEach((url) => {
      it(`${url}`, async function () {
        const response = await request
          .post(LINK_PATH)
          .send({ url })
          .set('Authorization', bearerToken)
        expect(response.status).to.eql(204)
      })
    })
  })

  describe('delete link', function () {
    it('items should decrease by link with specific id', async function () {
      const response = await request
        .delete(`${LINK_PATH}/${linkIdDeleted}`)
        .send({ email })
        .set('Authorization', bearerToken)

      expect(response.status).to.eql(204)
      const user = await User.findOne({ email: 'testUser' })
      expect(user.items.length).to.eql(items.length + linksUrls.length - 1)
    })
  })

  describe('update item', function () {
    it('Like item, should change field liked from false to true ', async function () {
      const response = await request
        .patch(`${LINK_PATH}/${linkIdUpdated}`)
        .send({ liked: true })
        .set('Authorization', bearerToken)

      expect(response.status).to.eql(204)
      const user = await User.findOne({ email })
      const item = user.items.filter(
        (item) => item._id.toString() === linkIdUpdated
      )[0]

      expect(item.liked).to.be.true
      expect(item.home).to.be.true
      expect(item.archived).to.be.false
    })

    it('Dislike item,should change field liked from true to false ', async function () {
      const response = await request
        .patch(`${LINK_PATH}/${linkIdUpdated}`)
        .send({ liked: false })
        .set('Authorization', bearerToken)

      expect(response.status).to.eql(204)
      const user = await User.findOne({ email })
      const item = user.items.filter(
        (item) => item._id.toString() === linkIdUpdated
      )[0]

      expect(item.liked).to.be.false
      expect(item.home).to.be.true
      expect(item.archived).to.be.false
    })
  })

  after(async function () {
    await mongoose.connection.db.collection('users').drop()
    await mongoose.connection.close()
  })
})
