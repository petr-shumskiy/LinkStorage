const User = require('../models/User')

class FolderLogic {
  async createFolder(email, folderName) {
    const user = await User.findOne({ email })
    user.folders.push({ name: folderName.toLowerCase() })
    await user.save()
    return user.folders.find(
      (folder) => folder.name === folderName.toLowerCase()
    )
  }

  async getFolders(email) {
    const user = await User.findOne({ email })
    return user.folders
  }

  async updateFolder(email, folderId, folderName) {
    const user = await User.findOne({ email })
    const folder = user.folders.find(
      (folder) => folder._id.toString() === folderId
    )
    user.items.forEach((item) => {
      if (item.currentFolder === folder.name) {
        item.currentFolder = folderName
      }
    })
    folder.name = folderName
    await user.save()
  }

  async deleteFolder(email, folderId) {
    const user = await User.findOne({ email })
    const name = await user.folders.id(folderId).name
    console.log(name)
    await User.findOneAndUpdate(
      { email },
      {
        $pull: {
          folders: { _id: folderId },
          items: { currentFolder: name }
        }
      },
      {
        $multi: true
      }
    )
    await user.save()
  }
}

module.exports = { FolderLogic }
