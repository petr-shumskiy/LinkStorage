const User = require('../models/User')

class ItemLogic {
  async addItem(email, item) {
    let user = await User.findOne({ email })

    user.items.push(item)
    await user.save()

    user = await User.findOne({ email })
    return user.items
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
    const user = await User.findOne({ email })
    return user.items
  }

  async updateItem(email, itemId, item) {
    const user = await User.findOne({ email })

    const currentItem = await user.items.id(itemId)

    if (item.liked !== undefined) {
      currentItem.set({ liked: item.liked })
    }
    if (item.archived !== undefined) {
      currentItem.set({ archived: item.archived, home: !item.archived })
    }
    await user.save()
  }
}

module.exports = { ItemLogic }
