const User = require('../models/User')

class ItemLogic {
  // ниже логика для линков
  async addItem(email, itemUrl) {
    // const { email } = req.user
    const user = await User.findOne({email})

    user.items = [...user.items, {url: itemUrl} ]
    // user.items.push({ url: itemUrl })
    console.log(user)
    await user.save()
  }

  async getItems(email) {
    const user = await User.findOne(email)

    return user.items
  }

  async deleteItem(email, itemId) {
    // await User.findOneAndUpdate({
    //   'email': email,
    //   'items._id': itemId
    // },
    //   {
    //     $pull: {
    //       'items': {
    //         '_id': itemId
    //       }
    //     }
    //   })
    const user = User.findOne(email)
    user.update({
      'items._id': itemId
    }, {
      $pull:{
        items: {_id: itemId}
      }
    })
    // console.log(email)
  }
}

module.exports = { ItemLogic }
