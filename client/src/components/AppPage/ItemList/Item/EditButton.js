import { createStyles, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateItemContentThunk } from '../../../../redux/userReducer'
import { EditItemDialog } from './ItemActions/EditItemDialog'
import { StyledButton } from './ItemActions/StyledButtons'

const useStyles = makeStyles((theme) =>
  createStyles({
    editButton: {
      position: 'absolute',
      top: theme.spacing(-1),
      right: 0,
      [theme.breakpoints.down('md')]: {
        top: theme.spacing(-2)
      }
    }
  })
)

export function EditButton({ isActive, item, onCloseEditDialog }) {
  const dispatch = useDispatch()
  const [isItemEditDialogOpen, setIsItemEditDialogOpen] = useState(false)

  const handleSave = async (title, url, description) => {
    dispatch(updateItemContentThunk(item._id, { title, url, description }))
    setIsItemEditDialogOpen(false)
  }

  const handleClick = () => {
    setIsItemEditDialogOpen(true)
  }

  const handleClose = () => {
    setIsItemEditDialogOpen(false)
    onCloseEditDialog()
  }

  const classes = useStyles()
  return (
    <>
      <EditItemDialog
        open={isItemEditDialogOpen}
        onClose={handleClose}
        onSave={handleSave}
        item={item}
      />

      <StyledButton
        onClick={handleClick}
        className={classes.editButton}
        style={{ display: isActive ? 'inline-block' : 'none' }}
      >
        <Typography variant='body1' color='inherit'>
          edit
        </Typography>
      </StyledButton>
    </>
  )
}
