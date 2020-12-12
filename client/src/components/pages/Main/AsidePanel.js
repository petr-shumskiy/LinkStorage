import React from 'react'
import mainStyle from './mainStyle'

import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core'

import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined'
import VideoLibrarySharpIcon from '@material-ui/icons/VideoLibrarySharp'

import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const AsidePanel = () => {
  const classes = mainStyle()
  const userFoldersData = useSelector(({ user }) => user.folders)

  const DrawerItem = ({ Icon, text, link, getData }) => {
    return (
      <NavLink to={link}>
        <ListItem button key={'Home2'} onClick={() => {}}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </NavLink>
    )
  }

  const userFolders = (
    <List>
      {userFoldersData.map((text, index) => (
        <NavLink to={'/' + text} key={index}>
          <ListItem button>
            <ListItemIcon>
              <FolderOpenIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        </NavLink>
      ))}
    </List>
  )

  return (
    <div>
      <div className={classes.toolbar}>
        <Typography className={classes.logo} variant='h6' noWrap>
          LinkStorage
        </Typography>
      </div>
      <Divider />
      <List>
        <DrawerItem Icon={HomeOutlinedIcon} text={'Home'} link='/home' />
        <DrawerItem Icon={FavoriteBorderOutlinedIcon} text={'Liked'} link='liked' />
        <DrawerItem Icon={ArchiveOutlinedIcon} text={'Archive'} link='archived' />
        <DrawerItem Icon={VideoLibrarySharpIcon} text={'Videos'} link='/videos' />
      </List>
      <Divider />
      {userFolders}

      <Button className={classes.addFolderBtn}>Add Folder</Button>
    </div>
  )
}

export default AsidePanel
