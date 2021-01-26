const User = require('../models/User')

class FolderLogic {
  async createFolder(email, folderName) {
    const user = await User.findOne({ email })

    user.folders.push({ name: folderName })
    await user.save()

    return await this.getFolders(email)
  }

  async getFolders(email) {
    const user = await User.findOne({ email })

    return user.folders
  }

  async updateFolder(email, folderId, folderName) {
    const user = await User.findOne({ email })
    const folder = user.folders.filter(
      (folder) => folder._id.toString() === folderId
    )[0]
    folder.name = folderName
    await user.save()
    return this.getFolders(email)
  }

  async deleteFolder(email, folderId) {
    console.log(folderId)
    const user = await User.findOne({ email })
    user.folders = user.folders.filter(
      (folder) => folder._id.toString() !== folderId
    )
    await user.save()
    return this.getFolders(email)
  }
}

module.exports = { FolderLogic }
