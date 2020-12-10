const { ControllerBase } = require('./controllerBase')

class FolderController extends ControllerBase {
  constructor(folderLogic) {
    super()
    this.folderLogic = folderLogic
  }

  async createFolder(userId, folderName) {
    try {
      await this.folderLogic.createFolder(userId, folderName)

      return this.response.status(204).json()
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }

  async getFolders(userId) {
    try {
      const folders = await this.folderLogic.getFolders(userId)

      return this.response.status(200).json(folders)
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }

  async updateFolder(userId, folderId, folderName) {
    try {
      await this.folderLogic.updateFolder(userId, folderId, folderName)

      return this.response.status(204).json()
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }

  async deleteFolder(userId, folderId) {
    try {
      await this.folderLogic.deleteFolder(userId, folderId)

      return this.response.status(204).json()
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }
}

module.exports = { FolderController }
