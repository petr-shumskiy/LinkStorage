const { ControllerBase } = require('./controllerBase')

class FolderController extends ControllerBase {
  constructor(folderLogic) {
    super()
    this.folderLogic = folderLogic
  }

  async createFolder(email, folderName) {
    try {
      const folders = await this.folderLogic.createFolder(email, folderName)

      console.log(folders)
      return this.response.status(201).json({ folders })
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }

  async getFolders(email) {
    try {
      const folders = await this.folderLogic.getFolders(email)

      return this.response.status(200).json(folders)
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }

  async updateFolder(email, folderId, folderName) {
    try {
      await this.folderLogic.updateFolder(email, folderId, folderName)

      return this.response.status(204).json()
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }

  async deleteFolder(email, folderId) {
    try {
      await this.folderLogic.deleteFolder(email, folderId)

      return this.response.status(204).json()
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }
}

module.exports = { FolderController }
