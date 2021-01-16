import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography
} from '@material-ui/core'
import {
  ArchiveOutlined,
  FavoriteBorderOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  HomeOutlined
} from '@material-ui/icons'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'

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
    active: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold
    },

    addFolder: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '6px 16px'
    },
    addFolderText: {
      opacity: 0.7,
      '&:hover': {
        opacity: 1
      }
    },
    input: {
      padding: '0px 0',
      fontSize: '0.8em'
    },
    listText: {
      color: 'inherit',
      fontWeight: 'inherit'
    }
  })
)

function AddFolder({ onAddFolderClicked }) {
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

function AddFolderInput({ onAddFolderClicked }) {
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

function DefaultItemList({ text, Icon }) {
  const classes = useStyles()
  const [isActive, setActive] = useState(false)

  const onMouseClicked = (e) => {
    setActive((prev) => !prev)
  }

  return (
    <ListItem
      button
      onClick={onMouseClicked}
      classes={{ root: classes.root }}
      className={isActive ? classes.active : null}
    >
      <ListItemIcon
        className={isActive ? classes.active : null}
        style={{
          color: 'inherit',
          minWidth: 0,
          marginRight: '1rem',
          opacity: [isActive ? 1 : 0.65]
        }}
      >
        <Icon className={isActive ? classes.active : classes.nonActive} />
      </ListItemIcon>
      <ListItemText
        className={isActive ? classes.active : classes.nonActive}
        variant='body1'
        classes={{
          primary: classes.listText
        }}
        primary={text}
      />
    </ListItem>
  )
}

export function Aside() {
  const [isInputActive, setInputActive] = useState(false)
  const onAddFolderClicked = () => {
    console.log('hi')
    setInputActive((prev) => {
      console.log(prev)
      return !prev
    })
  }

  return (
    <Grid
      container
      direction='column'
      alignItems='flex-start'
      style={{
        maxWidth: 210,
        position: 'fixed',
        color: 'black'
      }}
    >
      <Grid item>
        <List>
          <DefaultItemList text={'Home'} Icon={HomeOutlined} />
          <DefaultItemList text={'Liked'} Icon={ArchiveOutlined} />
          <DefaultItemList text={'Archived'} Icon={FavoriteBorderOutlined} />
        </List>
      </Grid>
      <Grid item style={{ width: '85%' }}>
        <Divider style={{ backgroundColor: 'gray' }} />
      </Grid>
      <Grid item>
        <List>
          <DefaultItemList text={'Programming'} Icon={FolderOpenOutlined} />
          <DefaultItemList text={'Art'} Icon={FolderOpenOutlined} />
          <DefaultItemList text={'Inspiration'} Icon={FolderOpenOutlined} />
        </List>
      </Grid>
      <Grid item>
        {isInputActive ? (
          <AddFolderInput onAddFolderClicked={onAddFolderClicked} />
        ) : (
          <AddFolder onAddFolderClicked={onAddFolderClicked} />
        )}
      </Grid>
    </Grid>
  )
}
