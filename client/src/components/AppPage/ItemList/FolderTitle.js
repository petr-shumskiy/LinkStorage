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
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  deleteFolderThunk,
  getFolderNames,
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
  const folderNames = useSelector(getFolderNames)
  const dispatch = useDispatch()
  const { push } = useHistory()
  const [inputFolderName, setInputFolderName] = useState(folderName)

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const isFolderNameExists = folderNames.includes(inputFolderName.toLowerCase())

  const getErrorMessage = () => {
    if (isFolderNameExists && inputFolderName !== folderName) {
      return 'folder with a such name has already exists'
    } else if (!inputFolderName) {
      return "folder name can't be empty"
    }
    return null
  }
  // let errorMessage
  // if (isFolderNameExists) {}

  useEffect(() => {
    setInputFolderName(folderName)
  }, [folderName])

  const handleChange = (e) => {
    setInputFolderName(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (folderName === inputFolderName) {
      onDialogClosed()
      return
    }
    await dispatch(renameFolderThunk(folderId, inputFolderName))
    push('/' + inputFolderName.trimRight())
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
      <form onSubmit={handleSubmit}>
        <DialogContent style={{ display: 'flex', alignItems: 'center' }}>
          <InputLabel htmlFor='edit-folder' style={{ marginRight: 16 }}>
            Title
          </InputLabel>
          <TextField
            id='edit-folder'
            autoFocus
            variant='outlined'
            type='text'
            value={inputFolderName}
            onChange={handleChange}
            error={!!getErrorMessage()}
            helperText={getErrorMessage()}
          />
        </DialogContent>
        <DialogActions>
          <Button
            type='sumbit'
            size='large'
            variant='contained'
            color='secondary'
            disabled={
              !inputFolderName || (isFolderNameExists && folderName !== inputFolderName)
            }
          >
            save
          </Button>
        </DialogActions>
      </form>
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
        <Typography variant='h3' style={{ textTransform: 'capitalize' }}>
          {label}
        </Typography>
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
