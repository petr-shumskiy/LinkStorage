const { ControllerBase } = require('./controllerBase')

class ItemController extends ControllerBase {
  constructor(itemLogic) {
    super()
    this.itemLogic = itemLogic
  }

  async addItem(email, itemUrl) {
    try {
      await this.itemLogic.addItem(email, itemUrl)
      return this.response.status(204).json()
    } catch (err) {
      console.log(err._message)
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
}

module.exports = { ItemController }
