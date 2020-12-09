const { ControllerBase } = require('./controllerBase')


class FolderController extends ControllerBase{
  constructor(folderLogic){
    super();
    this.folderLogic = folderLogic;
  }

  async createFolder(userId, folderName){
    try{
      await this.folderLogic.createFolder(userId, folderName);

      return this.response.status(204).json();
    } catch (err) {
      console.log(err);
      return this.response.status(500).json();
    }
  }

  async getFolders(userId){
    try{
      let folders = await this.folderLogic.getFolders(userId);

      return this.response.status(200).json(folders);
    } catch (err) {
      console.log(err);
      return this.response.status(500).json();
    }
  }

  async updateFolder(userId, folderId, folderName){
    try{
      await this.folderLogic.updateFolder(userId, folderId, folderName);

      return this.response.status(204).json();
    } catch (err){
      console.log(err);
      return this.response.status(500).json();
    }
  }

  async deleteFolder(userId, folderId){
    try{
      await this.folderLogic.deleteFolder(userId, folderId);

      return this.response.status(204).json();
    } catch (err){
      console.log(err);
      return this.response.status(500).json();
    }
  }
  // ниже контроллеры для линков
  async addItem(userId, itemTitle, itemHyperlink){
    try{
      await this.folderLogic.addItem(userId, itemTitle, itemHyperlink);

      return this.response.status(204).json();
    } catch (err){
      console.log(err);
      return this.response.status(500).json();
    }
  }

  async getItems(userId){
    try{
      let items = await this.folderLogic.getItems(userId);

      return this.response.status(200).json(items);
    } catch (err) {
      console.log(err);
      return this.response.status(500).json();
    }
  }

  async deleteItem(userId, itemId){
    try{
      await this.folderLogic.deleteItem(userId, itemId);

      return this.response.status(204).json();
    } catch (err){
      console.log(err);
      return this.response.status(500).json();
    }
  }
}

module.exports = { FolderController }