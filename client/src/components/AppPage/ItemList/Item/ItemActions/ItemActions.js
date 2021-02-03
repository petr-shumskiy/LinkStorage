import { Box } from '@material-ui/core'
import {
  ArchiveRounded,
  DeleteRounded,
  Favorite,
  FavoriteBorderOutlined
} from '@material-ui/icons'
import React, { useState } from 'react'
import { DeleteDialog } from './DeleteDialog'
import { FoldersMenu } from './FoldersMenu'
import { StyledIconButton } from './StyledButtons'
import FolderIcon from '@material-ui/icons/Folder'
import { getFolders } from '../../../../../redux/userReducer'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'

export function ItemActions({
  isActive,
  onItemDeleted,
  onAddItemToFolder,
  onItemLiked,
  isItemLiked,
  onItemArchived,
  isItemArchived,
  category,
  item
}) {
  const folders = useSelector(getFolders)
  const [isOpen, setIsOpen] = useState(false)
  const [isFolderSelectorOpen, setFolderSelectorOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const { enqueueSnackbar } = useSnackbar()
  const isFoldersExists = !!useSelector(getFolders).length

  const deleteItemHandler = () => {
    onItemDeleted()
    setIsOpen(false)
  }

  const onMenuClicked = (e) => {
    if (category === 'home' && !isFoldersExists) {
      enqueueSnackbar("You haven't added any folders yet", {
        variant: 'info',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        preventDuplicate: true
      })
      return
    }
    setAnchorEl(e.currentTarget)
    setFolderSelectorOpen((prev) => !prev)
  }

  const onMenuClosed = (e) => {
    setAnchorEl(null)
    setFolderSelectorOpen((prev) => !prev)
  }

  return (
    <>
      <DeleteDialog
        isOpen={isOpen}
        onCancelClicked={() => setIsOpen(false)}
        onDeleteClicked={deleteItemHandler}
      />
      {(category === 'home' && !folders.length) || (
        <FoldersMenu
          anchorEl={anchorEl}
          onMenuClosed={onMenuClosed}
          onAddItemToFolder={onAddItemToFolder}
          category={category}
          folders={folders}
          item={item}
        />
      )}

      <Box
        style={{
          display: [isActive || isFolderSelectorOpen ? 'block' : 'none']
        }}
      >
        <StyledIconButton onClick={onItemLiked}>
          {isItemLiked ? (
            <Favorite fontSize='inherit' color='primary' />
          ) : (
            <FavoriteBorderOutlined fontSize='inherit' />
          )}
        </StyledIconButton>
        <StyledIconButton onClick={onMenuClicked}>
          <FolderIcon fontSize='inherit' />
        </StyledIconButton>
        {category === 'liked' ? null : (
          <StyledIconButton onClick={onItemArchived}>
            {isItemArchived ? (
              <ArchiveRounded fontSize='inherit' color='primary' />
            ) : (
              <ArchiveRounded fontSize='inherit' />
            )}
          </StyledIconButton>
        )}
        <StyledIconButton onClick={() => setIsOpen(true)}>
          <DeleteRounded fontSize='inherit' />
        </StyledIconButton>
      </Box>
    </>
  )
}
