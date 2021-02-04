const User = require('../models/User')
const metascraper = require('metascraper')([
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-title')(),
  require('metascraper-url')()
])
const got = require('got')

class ItemLogic {
  async searchItems(email, searchPattern) {
    const pattern = new RegExp(searchPattern)
    let items = await User.aggregate([
      {
        $match: {
          email
        }
      },
      {
        $unwind: {
          path: '$items'
        }
      },
      {
        $project: {
          item: '$items'
        }
      },
      {
        $match: {
          $or: [
            {
              'item.title': {
                $regex: pattern,
                $options: 'i'
              }
            },
            {
              'item.description': {
                $regex: pattern,
                $options: 'i'
              }
            },
            {
              'item.url': {
                $regex: pattern,
                $options: 'i'
              }
            }
          ]
        }
      },
      {
        $group: {
          _id: '$_id',
          values: { $addToSet: '$item' }
        }
      }
    ])

    items = items.length ? items[0].values : items

    return items
  }

  async addItem(email, targetUrl) {
    const user = await User.findOne({ email })
    try {
      const { body: html, url } = await got(targetUrl)
      const { title, description, image: logoUrl } = await metascraper({
        html,
        url
      })

      const item = {
        title: title || url,
        description,
        url: url.endsWith('/') ? url.slice(0, url.length - 1) : url,
        logoUrl:
          logoUrl ||
          'https://storage.googleapis.com/stateless-muslimdc-asia/raudhah-grocer/2020/08/9799f00a-no_image_available.jpg',
        wasAdded: new Date()
      }

      user.items.push(item)
      await user.save()
      return this.getItems(email)
    } catch (error) {
      return error
    }
  }

  async getItems(email) {
    const user = await User.findOne({ email })
    return user.items
  }

  async deleteItem(email, itemId) {
    const user = await User.findOne({ email })

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
    await user.save()
    return this.getItems(email)
  }

  async updateItemStatus(email, item) {
    const user = await User.findOne({ email })

    const currentItem = await user.items.id(item.id)

    if (item.liked !== undefined) {
      currentItem.set({ liked: !currentItem.liked })
    }
    if (item.archived !== undefined) {
      currentItem.set({ archived: item.archived, home: !item.archived })
    }
    if (item.folderId !== undefined) {
      if (item.folderId === 'home') {
        // move from archive to home
        currentItem.set({ home: true, archived: false, currentFolder: null })
      } else {
        // move from home or archive to folder
        const folderToPush = user.folders.id(item.folderId)

        currentItem.set({
          archived: false,
          home: false,
          currentFolder: folderToPush.name
        })
      }
    }

    await user.save()
  }

  async updateItemContent(email, itemId, content) {
    const { title, url, description } = content
    const user = await User.findOne({ email })
    const currentItem = await user.items.id(itemId)

    if (!title || !url) {
      throw Error('title or url is empty')
    } else {
      currentItem.title = title
      currentItem.url = url
      currentItem.description = description
      currentItem.wasAdded = new Date()
    }
    await user.save()
  }
}

module.exports = { ItemLogic }
