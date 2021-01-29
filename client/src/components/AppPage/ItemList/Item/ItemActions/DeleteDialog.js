import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

export function DeleteDialog({
  isOpen,
  onCancelClicked,
  onDeleteClicked,
  isFolder
}) {
  return (
    <Dialog open={isOpen} onClose={onCancelClicked}>
      <DialogTitle
        disableTypography
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 8
        }}
      >
        <Typography>Are you sure?</Typography>
        <IconButton onClick={onCancelClicked}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant='subtitle1'>
          {isFolder
            ? 'This will permanently delete folder and all of its content'
            : 'This will permanently delete link'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button size='small' onClick={onCancelClicked}>
          cancel
        </Button>
        <Button size='small' color='primary' onClick={onDeleteClicked}>
          ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
