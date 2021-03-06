const { ControllerBase } = require('./controllerBase')

class ItemController extends ControllerBase {
  constructor(itemLogic) {
    super()
    this.itemLogic = itemLogic
  }

  async addItem(email, url) {
    try {
      const items = await this.itemLogic.addItem(email, url)
      if (items instanceof Array) {
        return this.response.status(201).json(items)
      } else {
        console.log(items) // error
        return this.response.status(406).json()
      }
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }

  async getItems(email) {
    try {
      const items = await this.itemLogic.getItems(email)
      return this.response.status(200).json(items)
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }

  async deleteItem(email, itemId) {
    try {
      await this.itemLogic.deleteItem(email, itemId)
      return this.response.status(204).json()
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }

  async updateItemStatus(email, item) {
    try {
      await this.itemLogic.updateItemStatus(email, item)
      return this.response.status(201).json()
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }

  async updateItemContent(email, itemId, content) {
    try {
      const items = await this.itemLogic.updateItemContent(
        email,
        itemId,
        content
      )
      return this.response.status(200).json(items)
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }

  async searchItems(email, searchPattern) {
    try {
      const items = await this.itemLogic.searchItems(email, searchPattern)
      return this.response.status(200).json(items)
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }
}

module.exports = { ItemController }
