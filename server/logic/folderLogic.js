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
}

module.exports = { FolderLogic }
