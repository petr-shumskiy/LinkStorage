const User = require('../models/User')

class FolderLogic {
  async createFolder(email, folderName) {
    let user = await User.findOne({ email })

    user.folders.push({ name: folderName })
    await user.save()
    user = await User.findOne({ email })
    return await this.getFolders(email)
  }

  async getFolders(email) {
    const user = await User.findOne({ email })

    return user.folders
  }

  async updateFolder(email, folderId, folderName) {
    await User.findOneAndUpdate(
      {
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
      }
    )
  }

  async deleteFolder(email, folderId) {
    await User.findOneAndUpdate(
      {
        email
      },
      {
        $pull: {
          folders: {
            id: folderId
          }
        }
      }
    )
  }
}

module.exports = { FolderLogic }
