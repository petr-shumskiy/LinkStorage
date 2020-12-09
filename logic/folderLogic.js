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
      '_id': userId,
      'folders._id': folderId
    },
    {
      $set: {
        'folders.$.name': folderName
      }
    })
  }

  async deleteFolder(userId, folderId) {

    await User.findOneAndUpdate({
      '_id': userId,
      'folders._id': folderId
    },
    {
      $pull: {
        'folders': {
          '_id': folderId
        } 
      }
    })
  }
  // ниже логика для линков
  async addItem(userId, itemTitle, itemHyperlink) {

    const user = await User.findById(userId)
    
    user.items.push({ title: itemTitle, hyperlink: itemHyperlink });

    await user.save()
  }

  async getItems(userId) {

    const user = await User.findById(userId)

    return user.items

  }

  async deleteItem(userId, itemId) {

    await User.findOneAndUpdate({
      '_id': userId,
      'items._id': itemId
    },
    {
      $pull: {
        'items': {
          '_id': itemId
        } 
      }
    })
  }
}


module.exports = { FolderLogic }