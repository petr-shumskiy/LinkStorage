const User = require('../models/User')

const getItems = async (req, res) => {
  try {
    const { email } = req.user
    const user = await User.findOne({ email })
    return res.status(200).json({ data: user.items })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'server error' })
  }
}
const addItem = async (req, res) => {
  try {
    //
  } catch (error) {}
}
const deleteItem = async (req, res) => {
  try {
    //
  } catch (error) {}
}

module.exports = {
  getItems,
  addItem,
  deleteItem
}
