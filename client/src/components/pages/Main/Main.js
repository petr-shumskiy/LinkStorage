import React from 'react'
import propTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AccountCircle } from '@material-ui/icons/'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import MoreIcon from '@material-ui/icons/MoreVert'
import VideoLibrarySharpIcon from '@material-ui/icons/VideoLibrarySharp'
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { useTheme } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import mainStyle from './mainStyle'
import { connect } from 'react-redux'
import { logOut } from './../../../redux/userReducer'

const Main = ({
  token,
  logOut,
  location
}) => {
  const window = undefined
  const classes = mainStyle()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar}>
      <Typography className={classes.logo} variant="h6" noWrap>
            LinkStorage
      </Typography>
      </div>
      <Divider />
      <List>
        <ListItem button key={'Home'}>
          <ListItemIcon><HomeOutlinedIcon /></ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem button key={'Liked'}>
          <ListItemIcon><FavoriteBorderOutlinedIcon /></ListItemIcon>
          <ListItemText primary={'Liked'} />
        </ListItem>
        <ListItem button key={'Archive'}>
          <ListItemIcon><ArchiveOutlinedIcon /></ListItemIcon>
          <ListItemText primary={'Archive'} />
        </ListItem>
        <ListItem button key={'Videos'}>
          <ListItemIcon><VideoLibrarySharpIcon /></ListItemIcon>
          <ListItemText primary={'Videos'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {['Folder'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><FolderOpenIcon /></ListItemIcon>
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
      <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
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
      <MenuItem onClick={handleProfileMenuOpen}>
        <p>Account</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <p>Log out</p>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
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
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <Button className={classes.addFolderBtn}>Add Link</Button>
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
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
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringil aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

export default connect(mapStateToProps, {
  logOut
})(Main)

Main.propTypes = {
  token: propTypes.string,
  logOut: propTypes.func
}
