import {
  Box,
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputLabel,
  makeStyles,
  TextField
} from '@material-ui/core'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) =>
  createStyles({
    dialogContent: {
      display: 'flex',
      alignItems: 'flex-end',
      flexDirection: 'column'
    },
    inputRow: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 24
    },
    label: {
      marginRight: 48,
      opacity: 0.7
    },
    TextField: {
      minWidth: 360
    }
  })
)

export function EditItemDialog({ open, onClose, onSave, item }) {
  const classes = useStyles()

  const [title, setTitle] = useState(item.title)
  const [url, setUrl] = useState(item.url)
  const [description, setDescription] = useState(item.description)

  // useEffect(() => setTitle(item.title), [item])
  // useEffect(() => setUrl(item.url), [item])
  // useEffect(() => setDescription(item.description), [item])

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const onUrlChange = (e) => {
    setUrl(e.target.value)
  }
  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(title, url, description)
    onSave(title, url, description)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit link</DialogTitle>
      <Divider style={{ marginBottom: 16 }} />
      <form onSubmit={submitHandler}>
        <DialogContent className={classes.dialogContent}>
          <Box className={classes.inputRow}>
            <InputLabel htmlFor='edit-title' className={classes.label}>
              Title
            </InputLabel>
            <TextField
              id='edit-title'
              variant='outlined'
              autoFocus
              type='text'
              size='small'
              className={classes.TextField}
              value={title}
              onChange={onTitleChange}
            />
          </Box>
          <Box className={classes.inputRow}>
            <InputLabel htmlFor='edit-url' className={classes.label}>
              Link
            </InputLabel>
            <TextField
              id='edit-url'
              variant='outlined'
              type='text'
              size='small'
              className={classes.TextField}
              value={url}
              onChange={onUrlChange}
            />
          </Box>
          <Box className={classes.inputRow} style={{ marginBottom: 0 }}>
            <InputLabel htmlFor='edit-description' className={classes.label}>
              Summary
            </InputLabel>
            <TextField
              multiline
              rowsMax={4}
              id='edit-description'
              variant='outlined'
              type='text'
              size='small'
              className={classes.TextField}
              placeholder='Summary (optional)'
              value={description}
              onChange={onDescriptionChange}
            />
          </Box>
        </DialogContent>
        <DialogActions style={{ paddingRight: 24 }}>
          <Button
            type='sumbmit'
            size='large'
            variant='contained'
            color='secondary'
          >
            save changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
