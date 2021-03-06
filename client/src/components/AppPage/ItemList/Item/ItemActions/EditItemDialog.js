import React, { useState } from 'react'
import {
  Box,
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputLabel,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) =>
  createStyles({
    dialogContent: {
      display: 'flex',
      alignItems: 'flex-end',
      flexDirection: 'column'
    },
    inputRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
      width: '100%'
    },
    label: {
      marginRight: 48,
      opacity: 0.7
    },
    TextField: {
      minWidth: 560
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
    if (title === item.title && url === item.url && description === item.description) {
      onClose()
      return
    }
    onSave(title, url, description)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md'>
      <DialogTitle
        disableTypography
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography>Edit link</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
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
              error={!title}
              helperText={!title ? "the title can't be empty" : null}
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
              value={description || ''}
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
            disabled={!title}
          >
            save changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
