import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { FolderTitle } from './FolderTitle'
import { NoContent } from './NoContent'
import { Item } from './Item/Item'

export function ItemsList({ items }) {
  const category = useLocation().pathname.split('/')[1]
  const categories = useSelector(({ user }) => user.categories)

  const folders = useSelector(({ user }) => user.folders)
  const folder = folders.filter((folder) => folder.name === category)[0]

  const currentCategoryItems = items
    .filter((item) => item[category])
    .map((item) => <Item key={item._id} item={item} category={category} />)

  const likedItemsInFolders = []
  for (const folder of folders) {
    for (const item of folder.items) {
      if (item.liked) {
        likedItemsInFolders.push(
          <Item key={item._id} item={item} category={category} />
        )
      }
    }
  }

  if (category === 'liked') {
    if (currentCategoryItems.length || likedItemsInFolders.length) {
      return [...currentCategoryItems, likedItemsInFolders]
    }
    return <NoContent label={category} />
  }

  const currentFolderItems =
    folder && folder.items.length ? (
      <>
        <FolderTitle id={folder._id} label={folder.name} />
        {folder.items.map((item) => {
          return <Item key={item._id} item={item} category={folder.name} />
        })}
      </>
    ) : null

  if (!currentCategoryItems.length && categories.includes(category)) {
    return <NoContent label={category} />
  }

  if (folder && !folder.items.length) {
    return (
      <>
        <FolderTitle id={folder._id} label={folder.name} />
        <NoContent label='' />
      </>
    )
  }

  return categories.includes(category)
    ? currentCategoryItems
    : currentFolderItems
}
