import React, { Dispatch, useState } from 'react'
import mainStyle from './mainStyle'

import {
  Button,
  Divider,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { AsideMenuItem, setItemActive, State } from '../../redux/userReducer'
import { Height } from '@material-ui/icons'

const MenuItems = () => {
  const defaultMuenuItemsData: Array<AsideMenuItem> = useSelector(
    ({ user }: { user: State }) => user.MenuItems
  )

  const dispatch: any = useDispatch()
  return (
    <>
      {defaultMuenuItemsData.map((item, idx) => {
        const { Icon, isSelected, link, name } = item
        return (
          <>
            <NavLink to={link}>
              <ListItem
                button
                selected={isSelected}
                onClick={() => dispatch(setItemActive(idx))}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </NavLink>
            {name === 'Archive' ? (
              <Divider style={{ marginBottom: 8 }} />
            ) : null}
          </>
        )
      })}
    </>
  )
}

const AsidePanel = () => {
  const classes = mainStyle()
  const [isEditMode, setEditMode] = useState(false)
  const [folderName, setFolderName] = useState('')

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      console.log(folderName)
      setFolderName('')
      setEditMode(false)
    }
  }

  return (
    <div>
      <div className={classes.toolbar}>
        <Typography className={classes.logo} variant='h6' noWrap>
          LinkStorage
        </Typography>
      </div>
      <Divider />
      <List>
        <MenuItems />

        <div className={classes.addFolder}>
          <Button
            className={classes.addFolderBtn}
            onFocus={() => setEditMode(!isEditMode)}
          >
            {isEditMode ? (
              <InputBase
                // className={classes.addFolderInput}
                // variant='inline'
                autoFocus
                onBlur={() => setEditMode(!isEditMode)}
                onChange={(e) => setFolderName(e.target.value)}
                value={folderName}
                onKeyPress={(e) => handleInputSubmit(e)}
                inputProps={{
                  style: {
                    padding: 0,
                    width: 83
                  }
                }}
              />
            ) : (
              'Add Folder'
            )}
          </Button>
        </div>
      </List>
    </div>
  )
}

export default AsidePanel
