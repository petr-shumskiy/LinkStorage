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

const AsidePanel = () => {
  const classes = mainStyle()
  const userFoldersData = useSelector(({ user }) => user.folders)

  const DrawerItem = ({ Icon, text, getData }) => {
    return (
      <ListItem button key={'Home2'} onClick={() => {}}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    )
  }

  const userFolders = (
    <List>
      {userFoldersData.map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>
            <FolderOpenIcon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
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
        <DrawerItem Icon={HomeOutlinedIcon} text={'Home'} />
        <DrawerItem Icon={FavoriteBorderOutlinedIcon} text={'Liked'} />
        <DrawerItem Icon={ArchiveOutlinedIcon} text={'Archive'} />
        <DrawerItem Icon={VideoLibrarySharpIcon} text={'Videos'} />
      </List>
      <Divider />
      {userFolders}

      <Button className={classes.addFolderBtn}>Add Folder</Button>
    </div>
  )
}

export default AsidePanel
