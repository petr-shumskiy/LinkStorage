import { Button, Divider, Grid, List, Typography } from '@material-ui/core'
import { ArchiveOutlined, FavoriteBorderOutlined, HomeOutlined } from '@material-ui/icons'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { AddFolderInput } from './AddFolderInput'
import { NavItem } from './NavItem'
import { AddFolder } from './AddFolder'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/authReducer'
import { Folders } from './Folders'
import { resetState } from '../../../redux/userReducer'
import { Fade, Zoom } from 'react-awesome-reveal'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(7),
      height: '100%',
      paddingBottom: theme.spacing(0.5),
      maxWidth: 210,
      position: 'fixed',
      color: theme.palette.secondary.main,
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(0),
        width: 'inherit',
        maxWidth: '100%'
      }
    },
    asideDividerWrapper: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '80%'
    },
    asideDivider: {
      height: '0.5px',
      width: '100%'
    }
  })
)

export function AsideNav({ swipeable }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isInputActive, setInputActive] = useState(false)
  const onAddFolderClicked = (data) => {
    setInputActive((prev) => {
      return !prev
    })
  }

  return (
    <Grid container direction='column' alignItems='flex-start' className={classes.root}>
      <Grid item style={{ width: '100%' }}>
        <List>
          <NavItem text={'home'} Icon={HomeOutlined} to='/home' />
          <NavItem text={'liked'} Icon={FavoriteBorderOutlined} to='/liked' />
          <NavItem text={'archived'} Icon={ArchiveOutlined} to='/archived' />
        </List>
      </Grid>
      <Grid item className={classes.asideDividerWrapper}>
        <Divider className={classes.asideDivider} />
      </Grid>
      <Grid item style={{ width: '100%' }}>
        <Folders />
      </Grid>
      <Grid item>
        {isInputActive ? (
          <Zoom duration={400}>
            <AddFolderInput onAddFolderClicked={onAddFolderClicked} />
          </Zoom>
        ) : (
          <Fade duration={100}>
            <AddFolder onAddFolderClicked={onAddFolderClicked} />
          </Fade>
        )}
      </Grid>
      {swipeable ? (
        <Button
          fullWidth
          onClick={() => {
            dispatch(logout())
            dispatch(resetState())
          }}
          variant='contained'
          style={{ marginTop: 'auto', alignSelf: 'center' }}
        >
          <Typography variant='subtitle1'>logout</Typography>
        </Button>
      ) : null}
    </Grid>
  )
}
