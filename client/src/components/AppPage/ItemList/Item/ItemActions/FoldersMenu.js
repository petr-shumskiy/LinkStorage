import { createStyles, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { getFoldersExceptCurrent } from '../../../../../redux/userReducer'

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      minWidth: 120,
      maxWidth: 240
    }
  })
)

export function FoldersMenu({
  anchorEl,
  onMenuClosed,
  onAddItemToFolder,
  category,
  folders,
  item
}) {
  const foldersExceptCurrent = useSelector((state) =>
    getFoldersExceptCurrent(category, state)
  )
  const classes = useStyles()
  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={anchorEl !== null}
      onClose={onMenuClosed}
      variant='menu'
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      classes={{ list: classes.list }}
    >
      {category !== 'home' ? (
        <MenuItem
          onClick={() => {
            onAddItemToFolder('home')
            onMenuClosed()
          }}
        >
          <Typography noWrap>Home</Typography>
        </MenuItem>
      ) : null}
      {foldersExceptCurrent.map((folder) =>
        item.currentFolder !== folder.name ? (
          <MenuItem
            key={folder._id}
            onClick={() => {
              onMenuClosed()
              onAddItemToFolder(folder._id)
            }}
            style={{ textTransform: 'capitalize', textOverflow: 'ellipsis' }}
          >
            <Typography noWrap>{folder.name}</Typography>
          </MenuItem>
        ) : null
      )}
    </Menu>
  )
}
