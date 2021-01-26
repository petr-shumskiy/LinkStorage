import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@material-ui/core'
import React from 'react'

export function DeleteDialog({
  isOpen,
  onCancelClicked,
  onDeleteClicked,
  isFolder
}) {
  return (
    <Dialog open={isOpen}>
      <DialogTitle disableTypography>
        <Typography variant='h2'>Are you sure?</Typography>
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
