const User = require('../models/User')

class ItemLogic {

  async addItem(email, itemUrl) {
 
    const user = await User.findOne({ email })

    user.items.push({ url: itemUrl })

    await user.save()
  }

  async getItems(email) {
    const user = await User.findOne({ email })

    return user.items
  }

  async deleteItem(email, itemId) {
    await User.findOneAndUpdate(
      { email },
      {
        $pull: {
          items: {
            _id: itemId
          }
        }
      }
    )
  }

  async updateItem(email, itemId, item) {
    const user = await User.findById({ email })
 
    const currentItem = user.items.id(itemId)

    if (item.liked !== undefined) {
      currentItem.set({ liked: item.liked })
    }
    if (item.archived !== undefined) {
      currentItem.set({ archived: item.archived })
    }
    user.save()
  }
}

module.exports = { ItemLogic }
