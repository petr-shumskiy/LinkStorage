/* eslint-disable indent */
import React, { useCallback, useState } from 'react'
import {
  Button,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
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
import { logout } from '../../../redux/authReducer'
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
      marginLeft: 0,
      flexGrow: 1,
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
      color: 'inherit',
      width: '100%'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('all'),
      [theme.breakpoints.up('md')]: {
        width: '70%',
        '&:focus': {
          width: '100%'
        }
      },
      [theme.breakpoints.down('md')]: {
        width: '70%',
        '&:focus': {
          width: '100%'
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
      whiteSpace: 'nowrap',
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
  const handleClick = () => {
    onMenuClosed()
    dispatch(logout())
    dispatch(resetState())
  }
  const theme = useSelector(getTheme)
  const handleChange = (e) => {
    console.log(e.target.value)
    dispatch(changeTheme(e.target.value === 'dark' ? 'light' : 'dark'))
    // dispatch()
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
      maxWidth='xl'
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
            style={{ marginLeft: 16, marginTop: 4 }}
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
  const email = useSelector(({ auth }) => auth.email)
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const debouncedSave = useCallback(
    debounce((nextValue) => dispatch(searchItemsThunk(nextValue)), 300),
    []
  )

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
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
            <NavButton onClick={handleClickOpen}>
              <Typography variant='body1' color='inherit'>
                Add Link
              </Typography>
            </NavButton>
            <AddLinkDialog onClose={handleClose} open={open} />
            <NavButton style={{ marginLeft: '0.5rem' }} onClick={onMenuClicked}>
              <Typography variant='body1' color='inherit'>
                {email}
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
