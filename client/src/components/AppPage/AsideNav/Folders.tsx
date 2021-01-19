import React from 'react'
import { List } from '@material-ui/core'
import { FolderOpenOutlined } from '@material-ui/icons'
import { NavItem } from './NavItem'
import { useSelector } from 'react-redux'
import { State } from '../../../redux/userReducer'

export function Folders() {
  const userFolders = useSelector(({ user }: { user: State }) => user.folders)

  return (
    <List>
      {userFolders.map((folder) => (
        <NavItem
          key={folder._id}
          text={folder.name}
          Icon={FolderOpenOutlined}
          to={'/' + folder.name}
        />
      ))}
    </List>
  )
}
