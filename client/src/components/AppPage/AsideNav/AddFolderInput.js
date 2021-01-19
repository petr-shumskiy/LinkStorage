import { makeStyles, TextField } from '@material-ui/core'
import { FolderOutlined } from '@material-ui/icons'
import React from 'react'

const useStyles = makeStyles({
  addFolder: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 16px'
  },
  input: {
    padding: '0px 0',
    fontSize: '0.8em'
  }
})

export function AddFolderInput({ onAddFolderClicked }) {
  const classes = useStyles()
  return (
    <div
      className={classes.addFolder}
      style={{
        minHeight: '57px'
      }}
    >
      <div
        style={{
          minWidth: '25%'
        }}
      >
        <FolderOutlined color='secondary' />
      </div>
      <form onSubmit={onAddFolderClicked}>
        <TextField
          variant='outlined'
          size='small'
          autoFocus
          className={classes.input}
          placeholder={'New Folder'}
          onBlur={onAddFolderClicked}
        />
      </form>
    </div>
  )
}
