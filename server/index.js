const path = require('path')
const sslRedirect = require('heroku-ssl-redirect').default
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const authRouter = require('./routes/authRoutes')
const itemRouter = require('./routes/itemRoutes')
const folderRouter = require('./routes/folderRoutes')

const PORT = process.env.PORT || config.get('serverPort')
const MONGO_URI = process.env.MONGO_URI
const MONGO_OPTIONS = config.get('mongoOptions')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))
app.use(sslRedirect())

app.use('/api/auth', authRouter)
app.use('/api/user', itemRouter)
app.use('/api/user', folderRouter)

app.use(express.static(path.join(__dirname, '..', 'client', 'build')))
app.use(express.static(path.join(__dirname, '..', 'client', 'public')))

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
})

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
