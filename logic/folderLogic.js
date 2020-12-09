const User = require('../models/User')

class FolderLogic {
  async createFolder(userId, folderName) {
    const user = await User.findById(userId)

    user.folders.push({ name: folderName })

    await user.save()
  }

  async getFolders(userId) {
    const user = await User.findById(userId)

    return user.folders
  }

  async updateFolder(userId, folderId, folderName) {
    await User.findOneAndUpdate({
      'id': userId,
      'folders.id': folderId
    },
    {
      $set: {
        'folders.$.name': folderName
      }
    })
  }

  async deleteFolder(userId, folderId) {
    await User.findOneAndUpdate({
      'id': userId,
      'folders.id': folderId
    },
    {
      $pull: {
        'folders': {
          'id': folderId
        }
      }
    })
  }

  // ниже логика для линков
  async addItem(userId, itemTitle, itemHyperlink) {
    const user = await User.findById(userId)

    user.items.push({ title: itemTitle, hyperlink: itemHyperlink })

    await user.save()
  }

  async getItems(userId) {
    const user = await User.findById(userId)

    return user.items

  }

  async deleteItem(userId, itemId) {
    await User.findOneAndUpdate({
      'id': userId,
      'items.id': itemId
    },
    {
      $pull: {
        'items': {
          'id': itemId
        }
      }
    })
  }
}

module.exports = { FolderLogic }
