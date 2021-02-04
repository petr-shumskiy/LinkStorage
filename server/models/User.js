const mongoose = require('mongoose')
const { Schema, model } = mongoose

const itemSchema = new Schema({
  title: { type: String, trim: true },
  url: { type: String, unique: true, required: true, trim: true },
  description: { type: String, trim: true },
  logoUrl: { type: String },
  home: { type: Boolean, default: true },
  liked: { type: Boolean, default: false },
  archived: { type: Boolean, default: false },
  currentFolder: { type: String, default: null, trim: true },
  wasAdded: { type: Date, default: new Date() }
})

const folderSchema = new Schema({
  name: { type: String, required: true, trim: true }
  // items: [itemSchema]
})

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  isEmailConfirmed: { type: Boolean, required: true, default: false },
  folders: [folderSchema],
  items: [itemSchema]
})

module.exports = model('User', userSchema)
