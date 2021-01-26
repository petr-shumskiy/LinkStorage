import { Menu, MenuItem } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

export function FoldersMenu({
  anchorEl,
  onMenuClosed,
  onAddItemToFolder,
  category
}) {
  const folders = useSelector(({ user }) => user.folders)

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={anchorEl !== null}
      onClose={onMenuClosed}
      variant='menu'
      transformOrigin={{
        vertical: 90,
        horizontal: 50
      }}
    >
      {category !== 'home' ? (
        <MenuItem
          onClick={() => {
            onAddItemToFolder('home')
            onMenuClosed()
          }}
        >
          Home
        </MenuItem>
      ) : null}
      {folders.map((folder) => {
        return folder.name !== category ? (
          <MenuItem
            key={folder._id}
            onClick={() => {
              onMenuClosed()
              onAddItemToFolder(folder._id)
            }}
          >
            {folder.name}
          </MenuItem>
        ) : null
      })}
    </Menu>
  )
}
