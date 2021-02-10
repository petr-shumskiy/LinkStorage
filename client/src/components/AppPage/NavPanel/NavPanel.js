/* eslint-disable indent */
import React, { useCallback, useState } from 'react'
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
  InputLabel,
  makeStyles,
  Menu,
  MenuItem,
  styled,
  Switch,
  TextField,
  Typography
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import debounce from 'lodash.debounce'
import { useDispatch, useSelector } from 'react-redux'
import { getEmail, logout } from '../../../redux/authReducer'
import { resetState } from '../../../redux/userReducer.ts'
import {
  addItemThunk,
  changeTheme,
  fetchItemsThunk,
  getAllItemsUrls,
  getTheme,
  searchItemsThunk
} from '../../../redux/userReducer'
import { trimUrl } from '../../../utils/trimUrl'
import { theme } from '../../../theme'

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
      flexGrow: 1,
      marginLeft: theme.spacing(0),
      width: 'auto',
      [theme.breakpoints.down('sm')]: {},
      [theme.breakpoints.down('xs')]: {
        marginRight: theme.spacing(1)
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
      [theme.breakpoints.down('sm')]: {
        marginLeft: 'auto'
      }
    },
    inputRoot: {
      width: '100%'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1rem + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('all'),
      [theme.breakpoints.down('sm')]: {
        width: '50%',
        '&:focus': {
          width: '100%'
        }
      }
    },
    navBar: {
      maxWidth: 1200,
      position: 'fixed',
      top: 0,
      width: 'inherit',
      zIndex: 1,
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        left: 0,
        paddingBottom: theme.spacing(0.5),
        borderBottom: '0.5px solid rgba(0,0,0,0.1)',
        width: '100%'
      }
    },

    navWrapper: {
      display: 'flex',
      alignItems: 'flex-start',
      [theme.breakpoints.down('md')]: {
        minWidth: 210 - 12,
        width: '100%',
        minHeight: 45,
        position: 'relative',
        justifyContent: 'space-between'
      },
      [theme.breakpoints.down('sm')]: {
        alignItems: 'flex-end',
        marginLeft: theme.spacing(8)
      }
    },
    logoTitle: {
      paddingTop: theme.spacing(2),
      whiteSpace: 'nowrap',
      [theme.breakpoints.down('md')]: {
        flexGrow: 3,
        // paddingTop: theme.spacing(2),
        marginRight: theme.spacing(3)
      },
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(0)
      }
    },
    menuButton: {
      position: 'absolute',
      top: 6,
      left: 20,
      color: 'black'
    },
    dialog: {
      minWidth: 'calc(100% - 16px)',
      margin: 0,
      [theme.breakpoints.up('sm')]: {
        minWidth: 'calc(80% - 16px)'
      },
      [theme.breakpoints.up('md')]: {
        minWidth: 'calc(65% - 16px)'
      },
      [theme.breakpoints.up('md')]: {
        minWidth: 'calc(55% - 16px)'
      }
    }
  })
)

function AccountMenu({ anchorEl, onMenuClosed }) {
  const dispatch = useDispatch()
  const handleClick = () => {
    onMenuClosed()
    dispatch(logout())
    dispatch(resetState())
  }
  const theme = useSelector(getTheme)
  const handleChange = (e) => {
    dispatch(changeTheme(e.target.value === 'dark' ? 'light' : 'dark'))
  }
  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={anchorEl !== null}
      onClose={onMenuClosed}
      variant='menu'
      transformOrigin={{
        vertical: -45,
        horizontal: -50
      }}
    >
      <MenuItem onClick={handleClick}>Logout</MenuItem>
      <MenuItem disableRipple>
        <Switch
          onChange={handleChange}
          value={theme}
          id='dark-theme'
          color='primary'
          checked={theme === 'dark'}
        />
        <InputLabel htmlFor='dark-theme' style={{ cursor: 'pointer' }}>
          <Typography variant='body1'>dark</Typography>
        </InputLabel>
      </MenuItem>
    </Menu>
  )
}

function AddLinkDialog({ onClose, open }) {
  const classes = useStyles()
  const [inputUrl, setInputUrl] = useState('')
  const [isTouched, setIsTouched] = useState(false)
  const dispatch = useDispatch()
  const allItemsUrls = useSelector(getAllItemsUrls)

  const isItemExists = allItemsUrls.includes(trimUrl(inputUrl))

  const handleClose = () => {
    setIsTouched(false)
    setInputUrl('')
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleClose()
    dispatch(addItemThunk(inputUrl))
  }
  const handleChange = async (e) => {
    setInputUrl(e.currentTarget.value)
    isTouched || setIsTouched(true)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth='lg'
      classes={{
        paper: classes.dialog
      }}
    >
      <DialogTitle
        disableTypography
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 8
        }}
      >
        <Typography>Add a link</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <form onSubmit={handleSubmit}>
        <DialogContent
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 24px'
          }}
        >
          <TextField
            variant='outlined'
            fullWidth
            placeholder='www.example.com/article.html'
            autoFocus
            margin='dense'
            id='name'
            label='url'
            error={isItemExists || (isTouched && !inputUrl)}
            helperText={
              isItemExists
                ? 'Item with such url has already exists'
                : isTouched && !inputUrl
                ? "url can't be empty"
                : null
            }
            value={inputUrl}
            classes={{
              root: classes.addLinkInput
            }}
            onChange={handleChange}
          />
          <Button
            type='submit'
            color='secondary'
            variant='contained'
            size='large'
            disabled={isItemExists || !inputUrl}
            style={{ marginLeft: 16, marginTop: 4, padding: '4px 0px' }}
          >
            Add
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export function NavPanel({ openDrawer }) {
  const dispatch = useDispatch()
  const email = useSelector(getEmail)
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const theme = useSelector(getTheme)

  /* eslint-disable */
  const debouncedSave = useCallback(
    debounce((nextValue) => dispatch(searchItemsThunk(nextValue)), 300),
    []
  )
  /* eslint-disable */

  const [anchorEl, setAnchorEl] = useState(null)

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    if (e.target.value) {
      debouncedSave(e.target.value)
      return
    }
    dispatch(fetchItemsThunk())
  }
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
    <Grid
      container
      className={classes.navBar}
      style={{ backgroundColor: theme === 'dark' ? '#212121' : '#ffffff' }}
    >
      <AddLinkDialog onClose={handleClose} open={open} />
      <AccountMenu anchorEl={anchorEl} onMenuClosed={onMenuClosed} />
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
        <Hidden xsDown>
          <Typography variant='h1' className={classes.logoTitle}>
            Link Storage
          </Typography>
        </Hidden>
        <Hidden mdUp>
          <div
            className={classes.search}
            style={{
              maxHeight: '35px',
              border: `1px solid ${theme === 'dark' ? '#ffffff' : '#212121'}`,
              borderRadius: 8
            }}
          >
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
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
          <NavButton onClick={handleClickOpen} size='small' style={{ paddingBottom: 0 }}>
            <Typography variant='body1' color='inherit'>
              Add
            </Typography>
          </NavButton>
          <Hidden only='xs'>
            <NavButton size='small' style={{ paddingBottom: 0 }} onClick={onMenuClicked}>
              <Typography variant='body1' color='inherit'>
                {email.split('@')[0]}
              </Typography>
            </NavButton>
          </Hidden>
        </Hidden>
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
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
            <NavButton onClick={handleClickOpen}>
              <Typography variant='body1' color='inherit'>
                Add Link
              </Typography>
            </NavButton>
            <NavButton style={{ marginLeft: '0.5rem' }} onClick={onMenuClicked}>
              <Typography variant='body1' color='inherit'>
                {email}
              </Typography>
            </NavButton>
          </Grid>
          <Grid container item xs={12}>
            <Divider style={{ width: '95%', height: 0.5 }}></Divider>
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  )
}
