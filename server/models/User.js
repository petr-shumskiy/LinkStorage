const mongoose = require('mongoose')
const { Schema, model } = mongoose

const itemSchema = new Schema({
  title: { type: String, trim: true },
  url: { type: String, required: true, trim: true },
  summary: { type: String, trim: true },
  tags: [{ type: String }],
  websiteLogo: { type: String },
  home: { type: Boolean, default: true },
  liked: { type: Boolean, default: false },
  archived: { type: Boolean, default: false }
})

const folderSchema = new Schema({
  name: { type: String, required: true, trim: true },
  items: [itemSchema]
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
