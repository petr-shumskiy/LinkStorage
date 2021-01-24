const User = require('../models/User')

class ItemLogic {
  async addItem(email, item) {
    const user = await User.findOne({ email })

    user.items.push(item)
    await user.save()

    return this.getItems(email)
  }

  async getItems(email) {
    const user = await User.findOne({ email })

    return user.items
  }

  async deleteItem(email, itemId) {
    const user = await User.findOne({ email })

    const findFolderWithItemId = (id) => {
      for (const folder of user.folders) {
        for (const item of folder.items) {
          if (item._id.toString() === itemId) {
            return [item, folder]
          }
        }
      }
      return [null, null]
    }

    const currentItem = await user.items.id(itemId)
    if (currentItem) {
      await User.findOneAndUpdate(
        { email },
        {
          $pull: {
            items: {
              _id: itemId
            }
          }
        }
      )
    } else {
      const [currentItem, currentFolder] = findFolderWithItemId(itemId)
      console.log(currentItem, currentFolder)
      currentFolder.items = currentFolder.items.filter(
        (item) => item._id.toString() !== itemId
      )
      console.log('currentFolder.items\n', currentFolder.items)
    }

    await user.save()
    return this.getItems(email)
  }

  async updateItem(email, itemId, item) {
    const user = await User.findOne({ email })

    const findFolderWithItemId = (id) => {
      for (const folder of user.folders) {
        for (const item of folder.items) {
          if (item._id.toString() === itemId) {
            return [item, folder]
          }
        }
      }
      return [null, null]
    }

    const currentItem = await user.items.id(itemId)

    if (item.liked !== undefined) {
      if (currentItem) {
        currentItem.set({ liked: !currentItem.liked })
      } else {
        const [currentItem, currentFolder] = findFolderWithItemId(itemId)
        currentItem.set({ liked: !currentItem.liked })
      }
    }
    if (item.archived !== undefined) {
      if (currentItem) {
        currentItem.set({ archived: item.archived, home: !item.archived })
      } else {
        const [currentItem, currentFolder] = findFolderWithItemId(itemId)
        currentItem.set({ archived: true })
        user.items.push(currentItem)
        currentFolder.items = currentFolder.items.filter(
          (item) => item._id.toString() !== itemId
        )
      }
    }

    if (item.folderId !== undefined) {
      const folderToPush = user.folders.filter(
        (folder) => folder._id.toString() === item.folderId
      )[0]
      if (currentItem) {
        if (item.folderId === 'home') {
          // move from archive to home
          currentItem.set({ home: true, archived: false })
        } else {
          // move from home or archive to folder
          currentItem.set({ archived: false, home: false })
          folderToPush.items.push(currentItem)
          user.items = user.items.filter(
            (item) => item._id.toString() !== itemId
          )
        }
      } else if (item.folderId === 'home') {
        // move grom folder to home
        const [currentItem, currentFolder] = findFolderWithItemId(itemId)
        currentItem.set({ home: true })
        user.items.push(currentItem)
        currentFolder.items = currentFolder.items.filter(
          (item) => item._id.toString() !== itemId
        )
      } else {
        // move from folder to folder
        const [currentItem, currentFolder] = findFolderWithItemId(itemId)
        if (currentItem && currentFolder) {
          folderToPush.items.push(currentItem)
          currentFolder.items = currentFolder.items.filter(
            (item) => item._id.toString() !== itemId
          )
        } else {
          throw new Error(
            'Error occurs while trying move item from one folder to another'
          )
        }
      }
    }

    await user.save()
    return this.getItems(email)
  }
}

module.exports = { ItemLogic }
