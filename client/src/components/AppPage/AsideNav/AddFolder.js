import {
  createStyles,
  ListItem,
  ListItemIcon,
  makeStyles,
  Typography
} from '@material-ui/core'
import { FolderOutlined } from '@material-ui/icons'
import React from 'react'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
        opacity: 1 + '!important'
      },
      transition: theme.transitions.create('font-weight', {
        easing: 'ease-in-out',
        duration: 150
      })
    },
    addFolderText: {
      opacity: 0.7,
      '&:hover': {
        opacity: 1
      }
    }
  })
)

export function AddFolder({ onAddFolderClicked }) {
  const classes = useStyles()
  return (
    <ListItem
      onClick={onAddFolderClicked}
      button
      className={classes.root}
      style={{
        minHeight: '57px'
      }}
    >
      <ListItemIcon
        style={{
          minWidth: 0,
          marginRight: '1rem',
          opacity: 0
        }}
      >
        <FolderOutlined />
      </ListItemIcon>
      <Typography
        variant='body1'
        color='secondary'
        classes={{
          root: classes.addFolderText
        }}
      >
        Add Folder
      </Typography>
    </ListItem>
  )
}
