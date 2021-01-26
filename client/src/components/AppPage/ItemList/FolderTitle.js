import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  styled,
  TextField,
  Typography
} from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  deleteFolderThunk,
  renameFolderThunk
} from '../../../redux/userReducer'
import { theme } from '../../../theme'
import { DeleteDialog } from './Item/ItemActions/DeleteDialog'
import { StyledButton } from './Item/ItemActions/StyledButtons'

const StyledDeleteIcon = styled(IconButton)({
  opacity: 0.7,
  '&:hover': {
    opacity: 1,
    color: theme.palette.error.dark
  }
})

function EditFolderDialog({ open, onDialogClosed, folderId, folderName }) {
  const dispatch = useDispatch()
  const { push } = useHistory()
  const [inputValue, setInputValue] = useState(folderName)

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    setInputValue(folderName)
  }, [folderName])

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleClick = async () => {
    onDialogClosed()
    await dispatch(renameFolderThunk(folderId, inputValue))
    push('/' + inputValue)
  }

  const handleDeleteFolder = async () => {
    setDeleteDialogOpen(false)
    onDialogClosed()
    await dispatch(deleteFolderThunk(folderId))
  }

  const onDeleteFolderClicked = async () => {
    setDeleteDialogOpen(true)
  }

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false)
  }

  return (
    <Dialog open={open} onClose={onDialogClosed}>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        isFolder={true}
        onCancelClicked={handleCancelDelete}
        onDeleteClicked={handleDeleteFolder}
      />

      <Box display='flex' justifyContent='space-Between' alignItems='center'>
        <DialogTitle>Edit folder</DialogTitle>
        <StyledDeleteIcon color='inherit' onClick={onDeleteFolderClicked}>
          <DeleteOutlined />
        </StyledDeleteIcon>
      </Box>
      <DialogContent style={{ display: 'flex', alignItems: 'center' }}>
        <InputLabel htmlFor='edit-folder' style={{ marginRight: 16 }}>
          Title
        </InputLabel>
        <TextField
          id='edit-folder'
          autoFocus
          variant='outlined'
          type='text'
          value={inputValue}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          size='large'
          variant='contained'
          color='secondary'
          onClick={handleClick}
        >
          save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export function FolderTitle({ id, label }) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <EditFolderDialog
        open={open}
        onDialogClosed={handleClose}
        folderId={id}
        folderName={label}
      />
      <Box display='flex' alignItems='center' marginBottom='1rem'>
        <Typography variant='h3'>{label}</Typography>
        <StyledButton
          onClick={handleClickOpen}
          type='small'
          style={{
            marginLeft: '1rem',
            padding: '6px 4px',
            minWidth: 40,
            height: 24
          }}
        >
          <Typography variant='subtitle2' color='inherit'>
            Edit
          </Typography>
        </StyledButton>
      </Box>
    </>
  )
}
