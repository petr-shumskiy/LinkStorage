const { ControllerBase } = require('./controllerBase')

class ItemController extends ControllerBase {
  constructor(itemLogic) {
    super()
    this.itemLogic = itemLogic
  }

  async addItem(email, item) {
    try {
      console.log(item)
      const items = await this.itemLogic.addItem(email, item)
      console.log('ITEMS FOR RESPONSE', items)
      return this.response.status(201).json(items)
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
      const items = await this.itemLogic.deleteItem(email, itemId)
      return this.response.status(201).json(items)
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }

  async updateItem(email, itemId, item) {
    try {
      await this.itemLogic.updateItem(email, itemId, item)
      return this.response.status(204).json()
    } catch (err) {
      console.log(err)
      return this.response.status(500).json()
    }
  }
}

module.exports = { ItemController }
