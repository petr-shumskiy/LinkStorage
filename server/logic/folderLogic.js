const User = require('../models/User')

class FolderLogic {
  async createFolder(email, folderName) {
    const user = await User.findOne({ email })

    user.folders.push({ name: folderName })

    await user.save()
  }

  async getFolders(email) {
    const user = await User.findOne({ email })

    return user.folders
  }

  async updateFolder(email, folderId, folderName) {
    await User.findOneAndUpdate({
      email,
      folders: {
        _id: folderId
      }
    },
    {
      $set: {
        folders: {
          name: folderName
        }
      }
    })
  }

  async deleteFolder(email, folderId) {
    await User.findOneAndUpdate({
      email
    },
    {
      $pull: {
        folders: {
          id: folderId
        }
      }
    })
  }
}

module.exports = { FolderLogic }
