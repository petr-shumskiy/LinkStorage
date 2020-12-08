import React from 'react'
import { AccountCircle } from '@material-ui/icons/'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import MoreIcon from '@material-ui/icons/MoreVert'
import VideoLibrarySharpIcon from '@material-ui/icons/VideoLibrarySharp'
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined'
import {
  AppBar,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Modal,
  Backdrop
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import mainStyle from './mainStyle'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentLinkType, takeLinkData } from '../../../redux/userReducer'
import { logout } from '../../../redux/authReducer'
import Cards from './../../Card/Cards'
import cardType from './../../Card/cardType'
import addLinkModal from './../../addLinkModal/addLinkModal'

const Main = () => {
  const window = undefined
  const classes = mainStyle()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const [modalOpen, setModalOpen] = React.useState(false)
  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const linksData = useSelector(({ user }) => user.linksData)
  const linkType = useSelector(({ user }) => user.linkType)
  const dispatch = useDispatch()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const loadLinkData = (cardType) => {
    dispatch(setCurrentLinkType(cardType))
    dispatch(takeLinkData())
  }

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Typography className={classes.logo} variant='h6' noWrap>
          LinkStorage
        </Typography>
      </div>
      <Divider />
      <List>
        <ListItem button key={'Home'} onClick={() => dispatch(loadLinkData(cardType.home))}>
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem button key={'Liked'} onClick={() => dispatch(loadLinkData(cardType.liked))}>
          <ListItemIcon>
            <FavoriteBorderOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={'Liked'} />
        </ListItem>
        <ListItem button key={'Archive'} onClick={() => dispatch(loadLinkData(cardType.archive))}>
          <ListItemIcon>
            <ArchiveOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={'Archive'} />
        </ListItem>
        <ListItem button key={'Videos'} onClick={() => dispatch(loadLinkData(cardType.video))}>
          <ListItemIcon>
            <VideoLibrarySharpIcon />
          </ListItemIcon>
          <ListItemText primary={'Videos'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {['Folder'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <FolderOpenIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Button className={classes.addFolderBtn}>Add Folder</Button>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleModalCLose = () => {
    setModalOpen(false)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={() => dispatch(logout())}>Log out</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>Account</MenuItem>
      <MenuItem onClick={() => dispatch(logout())}>Log out</MenuItem>
    </Menu>
  )
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
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
          <div className={classes.grow} />
          <Button className={classes.addFolderBtn} type='button' onClick={handleModalOpen}>
            Add Link
          </Button>
          <Modal
            open={modalOpen}
            onClose={handleModalCLose}
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className={classes.modal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 300
            }}
          >
            {addLinkModal()}
          </Modal>
          <div className={classes.sectionDesktop}>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {linksData.map(({ id, title, text, url, type, img }) => {
          if (type === linkType) {
            return <Cards text={text} title={title} url={url} typeCard={type} img={img} key={id} />
          }
          return null
        })}
      </main>
    </div>
  )
}

export default Main
