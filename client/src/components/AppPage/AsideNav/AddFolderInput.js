import { makeStyles, TextField } from '@material-ui/core'
import { FolderOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFolderThunk, getFolderNames } from '../../../redux/userReducer'

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
  const token = useSelector(({ auth }) => auth.token)
  const dispatch = useDispatch()
  const [folderName, setFolderName] = useState('')
  const folderNames = useSelector(getFolderNames)
  const isFolderExixts = folderNames.includes(folderName)

  const submitHandler = (e) => {
    e.preventDefault()
    if (isFolderExixts) {
      return
    }
    dispatch(addFolderThunk(token, folderName))
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
          error={isFolderExixts}
          helperText={isFolderExixts ? 'such name has already exists' : null}
        />
      </form>
    </div>
  )
}
