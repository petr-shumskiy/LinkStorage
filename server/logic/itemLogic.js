const User = require('../models/User')
const metascraper = require('metascraper')([
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-title')(),
  require('metascraper-url')()
])
const got = require('got')

// {
// description: 'GitHub is where over 56 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and feat...',
// image: 'https://github.githubassets.com/images/modules/site/social-cards/github-social.png',
// logo: null,
// title: 'GitHub: Where the world builds software',
// url: 'https://github.com'
// }

class ItemLogic {
  async addItem(email, targetUrl) {
    let user = await User.findOne({ email })

    const { body: html, url } = await got(targetUrl)
    const { title, description, image: logoUrl } = await metascraper({
      html,
      url
    })
    const item = {
      title: title || url,
      description,
      url,
      logoUrl:
        logoUrl ||
        'https://storage.googleapis.com/stateless-muslimdc-asia/raudhah-grocer/2020/08/9799f00a-no_image_available.jpg'
    }
    user.items.push(item)
    await user.save()
    user = await User.findOne({ email })
    console.log(user.items)

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

  // async u

  async updateItemStatus(email, itemId, item) {
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
        const currentItem = findFolderWithItemId(itemId)
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

  async updateItemContent(email, itemId, content) {
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
    const { title, url, description } = content
    const user = await User.findOne({ email })
    let currentItem = await user.items.id(itemId)

    let currentFolder
    if (!currentItem) {
      ;[currentItem, currentFolder] = findFolderWithItemId(itemId)
      console.log(currentItem, currentFolder)
    }

    if (!title || !url) {
      throw Error('title or url is empty')
    } else {
      currentItem.title = title
      currentItem.url = url
      currentItem.description = description
    }
    await user.save()
    return this.getItems(email)
  }
}

module.exports = { ItemLogic }
