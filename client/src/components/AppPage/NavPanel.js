import React, { useState } from 'react'
import {
  Button,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Hidden,
  IconButton,
  InputBase,
  makeStyles,
  Menu,
  MenuItem,
  styled,
  TextField,
  Typography
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'
import { theme } from '../../theme'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/authReducer'
import { addItemThunk } from '../../redux/userReducer'
const { ReactTinyLink } = require('react-tiny-link')

const NavButton = styled(Button)({
  '&:hover': {
    color: theme.palette.primary.main
  },
  height: 40,
  alignSelf: 'flex-end'
})

const useStyles = makeStyles((theme) =>
  createStyles({
    search: {
      alignSelf: 'flex-end',
      maxHeight: '40px',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      marginLeft: 0,
      marginRight: 'auto',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(0),
        width: 'auto'
      }
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.5rem'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('all'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '12ch',
        '&:focus': {
          width: '30ch'
        }
      },
      [theme.breakpoints.down('md')]: {
        width: '8ch',
        '&:focus': {
          width: '20ch'
        }
      }
    },
    addLinkInput: {
      minWidth: '30vw'
    },
    navBar: {
      maxWidth: 1200,
      position: 'fixed',
      top: 0,
      backgroundColor: 'white',
      width: 'inherit',
      zIndex: 1,
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        left: 0,
        paddingTop: 8,
        paddingBottom: 8,
        borderBottom: '0.5px solid rgba(0,0,0,0.1)',
        width: '100%'
      }
    },

    navWrapper: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        maxWidth: 170,
        minHeight: 45,
        position: 'relative',
        display: 'flex'
      }
    },
    logoTitle: {
      paddingTop: 15,
      [theme.breakpoints.down('sm')]: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '1.2em',
        top: 0
      },
      [theme.breakpoints.up('md')]: {
        textAlign: 'left'
      }
    },
    menuButton: {
      position: 'absolute',
      top: 0,
      left: 20,
      color: 'black'
    }
  })
)

function AccountMenu({ anchorEl, onMenuClosed }) {
  const dispatch = useDispatch()
  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={anchorEl !== null}
      onClose={onMenuClosed}
      variant='menu'
      // anchorOrigin={{
      //   vertical: null,
      //   horizontal: 'center'
      // }}
      transformOrigin={{
        vertical: -45,
        horizontal: -50
      }}
    >
      <MenuItem
        onClick={() => {
          onMenuClosed()
          dispatch(logout())
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  )
}

const mockImageUrl =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvg8J2136rRRC-MGBdmSfYXV56XKO-yKqyg&usqp=CAU'

function AddLinkDialog({ handleClose, open }) {
  const classes = useStyles()
  const [isSubmitted, setSubmitted] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()

  const handleScrappedData = async ({
    title,
    url,
    description,
    content,
    image
  }) => {
    const item = {
      title: title || 'The Valid title must be here but it does not :)',
      url: inputValue,
      description: description || content || '',
      logoUrl: image[0] || mockImageUrl
    }
    await dispatch(addItemThunk(item))
    setSubmitted(false)
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth='xl'
    >
      {isSubmitted ? (
        <ReactTinyLink
          url={inputValue}
          onSuccess={handleScrappedData}
          style={{ display: 'none' }}
        />
      ) : null}

      <DialogTitle id='form-dialog-title'>{'Add a link'}</DialogTitle>
      <DialogContent>
        <Grid container alignItems='center' justify='space-between' spacing={1}>
          <Grid item xs={10}>
            <TextField
              variant='outlined'
              placeholder='www.example.com/article.html'
              autoFocus
              margin='dense'
              id='name'
              label='url'
              onChange={(e) => setInputValue(e.currentTarget.value)}
              value={inputValue}
              onSubmit={() => setSubmitted(true)}
              classes={{
                root: classes.addLinkInput
              }}
            />
          </Grid>
          <Grid
            item
            xs={2}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button
              onClick={() => setSubmitted(true)}
              color='primary'
              variant='contained'
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export function NavPanel({ openDrawer }) {
  const [open, setOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)

  const onMenuClicked = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const onMenuClosed = (e) => {
    setAnchorEl(null)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const classes = useStyles()
  return (
    <Grid container className={classes.navBar}>
      <Hidden mdUp>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='primary'
          onClick={openDrawer}
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
      <Grid item xs={12} md={2} className={classes.navWrapper}>
        <Typography variant='h1' className={classes.logoTitle}>
          Link Storage
        </Typography>
      </Grid>
      <Hidden smDown>
        <Grid item md={9} sm={8} container style={{ paddingLeft: 20 }}>
          <Grid
            container
            style={{
              minHeight: 60,
              width: '95%'
            }}
          >
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon fontSize='small' />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <NavButton onClick={handleClickOpen}>
              <Typography variant='body1' color='inherit'>
                Add Link
              </Typography>
            </NavButton>
            <AddLinkDialog handleClose={handleClose} open={open} />
            <NavButton style={{ marginLeft: '0.5rem' }} onClick={onMenuClicked}>
              <Typography variant='body1' color='inherit'>
                fwshumskiy@gmail.com
              </Typography>
            </NavButton>
            <AccountMenu anchorEl={anchorEl} onMenuClosed={onMenuClosed} />
          </Grid>
          <Grid container item xs={12}>
            <Divider style={{ width: '95%', height: 0.5 }}></Divider>
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  )
}