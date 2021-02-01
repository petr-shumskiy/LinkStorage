import { createStyles, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateItemContentThunk } from '../../../../redux/userReducer'
import { EditItemDialog } from './ItemActions/EditItemDialog'
import { StyledButton } from './ItemActions/StyledButtons'

const useStyles = makeStyles((theme) =>
  createStyles({
    editButton: {
      position: 'absolute',
      top: -theme.spacing(1),
      right: 0,
      [theme.breakpoints.down('md')]: {
        top: -theme.spacing(2)
      }
    }
  })
)

export function EditButton({ isActive, item, onCloseEditDialog }) {
  const dispatch = useDispatch()
  const [isItemEditDialogOpen, setIsItemEditDialogOpen] = useState(false)

  const editItemHandler = async (title, url, description) => {
    dispatch(updateItemContentThunk(item._id, { title, url, description }))
    setIsItemEditDialogOpen(false)
  }

  const openItemEditDialog = () => {
    setIsItemEditDialogOpen(true)
  }

  const closeItemEditDialog = () => {
    setIsItemEditDialogOpen(false)
    onCloseEditDialog()
  }

  const classes = useStyles()
  return (
    <>
      <EditItemDialog
        open={isItemEditDialogOpen}
        onClose={closeItemEditDialog}
        onSave={editItemHandler}
        item={item}
      />

      <StyledButton
        onClick={openItemEditDialog}
        className={classes.editButton}
        style={{
          display: [isActive ? 'block' : 'none']
        }}
      >
        <Typography variant='body1' color='inherit'>
          edit
        </Typography>
      </StyledButton>
    </>
  )
}
