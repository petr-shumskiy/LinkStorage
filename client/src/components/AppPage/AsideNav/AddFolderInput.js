import { makeStyles, TextField } from '@material-ui/core'
import { FolderOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addFolderThunk } from '../../../redux/userReducer'

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
  const dispatch = useDispatch()
  const [folderName, setFolderName] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addFolderThunk(folderName))
    setFolderName('')
    onAddFolderClicked()
  }
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
      <form onSubmit={submitHandler}>
        <TextField
          variant='outlined'
          size='small'
          name='folderName'
          autoFocus
          className={classes.input}
          placeholder={'New Folder'}
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          onBlur={onAddFolderClicked}
        />
      </form>
    </div>
  )
}
