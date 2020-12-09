const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const authRouter = require('./routes/authRoutes')
const linkRouter = require('./routes/linkRoutes')

const PORT = config.get('serverPort')
const MONGO_URI = process.env.MONGO_URI
const MONGO_OPTIONS = config.get('mongoOptions')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

app.use('/api/auth', authRouter)
app.use('/api/', linkRouter)

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS)

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log(`The server or database failed\n${error}`)
  }
}

if (!module.parent) {
  start()
}

module.exports = app
