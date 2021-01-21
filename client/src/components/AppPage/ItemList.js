import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core'
import { createStyles, makeStyles, styled } from '@material-ui/core/styles'
import React, { useState } from 'react'
import FolderIcon from '@material-ui/icons/Folder'
import {
  ArchiveRounded,
  DeleteRounded,
  Favorite,
  FavoriteBorderOutlined
} from '@material-ui/icons'
import { theme } from '../../theme'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToFolder, deleteItemThunk } from '../../redux/userReducer'

const customStyles = {
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent'
  },
  backgroundColor: 'transparent',
  boxShadow: 'none',
  fontSize: '1.2rem',
  color: 'rgba(0, 0, 0, 0.7)',
  width: '40px',
  height: '40px'
}

const useStyle = makeStyles((theme) =>
  createStyles({
    root: {
      opacity: 0.7,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      maxWidth: 'inherit',
      [theme.breakpoints.down('md')]: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      '&:hover': {
        opacity: 1,
        color: theme.palette.primary.main,
        cursor: 'pointer'
      }
    },
    wrapText: {
      maxWidth: 'inherit',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    bgImage: {
      height: '70%',
      width: '100%',
      borderRadius: theme.shape.borderRadius,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    },
    hide: {
      display: 'none'
    },
    restrictedMaxWidth: {
      maxWidth: '100%'
    },
    editButton: {
      position: 'absolute',
      top: -theme.spacing(1),
      right: 0,
      [theme.breakpoints.down('md')]: {
        top: -theme.spacing(2)
      }
    }
  })
)

const StyledIconButton = styled(IconButton)(customStyles)

const StyledButton = styled(Button)(customStyles)

function FoldersMenu({ anchorEl, onMenuClosed, onAddItemToFolder }) {
  const folders = useSelector(({ user }) => user.folders)
  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={anchorEl !== null}
      onClose={onMenuClosed}
      variant='menu'
      transformOrigin={{
        vertical: 90,
        horizontal: 50
      }}
    >
      {folders.map((folder) => {
        return (
          <MenuItem
            key={folder._id}
            onClick={() => {
              onMenuClosed()
              onAddItemToFolder(folder._id)
            }}
          >
            {folder.name}
          </MenuItem>
        )
      })}
    </Menu>
  )
}

function ItemActions({
  isActive,
  deleteItemHandler,
  onAddItemToFolder,
  onItemLiked,
  isItemLiked
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isFolderSelectorOpen, setFolderSelectorOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)

  const onMenuClicked = (e) => {
    setAnchorEl(e.currentTarget)
    setFolderSelectorOpen((prev) => !prev)
  }

  const onMenuClosed = (e) => {
    setAnchorEl(null)
    setFolderSelectorOpen((prev) => !prev)
  }

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle disableTypography>
          <Typography variant='h2'>Are you sure?</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant='subtitle1'>
            This will permanently delete link
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button size='small' onClick={() => setIsOpen(false)}>
            cancel
          </Button>
          <Button
            size='small'
            color='primary'
            onClick={() => {
              deleteItemHandler()
              setIsOpen(false)
            }}
          >
            ok
          </Button>
        </DialogActions>
      </Dialog>

      <FoldersMenu
        anchorEl={anchorEl}
        onMenuClosed={onMenuClosed}
        onAddItemToFolder={onAddItemToFolder}
      />
      <div
        style={{
          display: [isActive || isFolderSelectorOpen ? 'block' : 'none']
        }}
      >
        <StyledIconButton onClick={onItemLiked}>
          {isItemLiked ? (
            <Favorite fontSize='inherit' color='primary' />
          ) : (
            <FavoriteBorderOutlined fontSize='inherit' />
          )}
        </StyledIconButton>
        <StyledIconButton onClick={onMenuClicked}>
          <FolderIcon fontSize='inherit' />
        </StyledIconButton>
        <StyledIconButton>
          <ArchiveRounded fontSize='inherit' />
        </StyledIconButton>
        <StyledIconButton onClick={() => setIsOpen(true)}>
          <DeleteRounded fontSize='inherit' />
        </StyledIconButton>
      </div>
    </>
  )
}

function DateOfTitle({ isActive, isItemLiked }) {
  const marginLeft = isActive && !isItemLiked ? 12 : 0
  console.log(marginLeft)
  return (
    <div
      style={{
        display: [isActive ? 'inline-block' : 'none'],
        marginLeft
      }}
    >
      <Typography variant='subtitle2'>
        {new Date().toLocaleDateString()}
      </Typography>
    </div>
  )
}

function LinkItem({ item }) {
  const { _id: id, url, title, description, logoUrl } = item
  const classes = useStyle()
  const dispatch = useDispatch()

  const [isActive, setActive] = useState(false)
  const [isItemLiked, setItemLiked] = useState(false)

  const onDeleteItem = (id) => {
    dispatch(deleteItemThunk(id))
  }

  const onAddItemToFolder = (folderId) => {
    dispatch(addItemToFolder({ folderId, item }))
  }

  const onItemLiked = () => {
    setItemLiked((prev) => !prev)
  }

  return (
    <div
      onMouseOver={() => setActive(true)}
      onMouseOut={() => setActive(false)}
    >
      <Grid
        container
        spacing={1}
        item
        xs={12}
        md={12}
        style={{ color: 'black' }}
      >
        <Grid
          container
          item
          md={10}
          sm={10}
          xs={12}
          direction='column'
          style={{
            position: 'relative'
          }}
        >
          <StyledButton
            className={classes.editButton}
            style={{
              display: [isActive ? 'block' : 'none']
            }}
          >
            <Typography variant='body1' color='inherit'>
              edit
            </Typography>
          </StyledButton>

          {/* title */}
          <Grid item className={classes.restrictedMaxWidth}>
            <Typography
              variant='h2'
              className={classes.wrapText}
              style={{ paddingRight: theme.spacing(8) }}
            >
              {title}
            </Typography>
          </Grid>

          {/* url */}
          <Grid item className={classes.restrictedMaxWidth}>
            <Typography variant='subtitle1' classes={{ root: classes.root }}>
              {url}
            </Typography>
          </Grid>

          {/* description */}
          <Grid item className={classes.restrictedMaxWidth}>
            <Typography variant='body2'>{description}</Typography>
          </Grid>
          <Grid
            item
            container
            alignItems='center'
            style={{
              minHeight: '40px',
              marginLeft: -12
            }}
          >
            <ItemActions
              isActive={isActive}
              deleteItemHandler={() => onDeleteItem(id)}
              onAddItemToFolder={onAddItemToFolder}
              onItemLiked={onItemLiked}
              isItemLiked={isItemLiked}
            />
            <StyledIconButton
              style={{
                display: [isItemLiked && !isActive ? '' : 'none']
              }}
            >
              <Favorite fontSize='inherit' color='primary' />
            </StyledIconButton>
            <DateOfTitle isActive={!isActive} isItemLiked={isItemLiked} />
          </Grid>
        </Grid>

        {/* image */}
        <Hidden only={['xs']}>
          <Grid
            item
            container
            md={2}
            sm={2}
            xs={false}
            justify='center'
            alignItems='center'
          >
            <div
              className={classes.bgImage}
              style={{
                backgroundImage: 'url(' + logoUrl + ')'
              }}
            ></div>
          </Grid>
        </Hidden>
      </Grid>
      <Divider
        style={{
          backgroundColor: 'black',
          width: '100%',
          margin: '0.5rem 0 1rem 0rem',
          opacity: 0.2
        }}
      />
    </div>
  )
}

export function ItemsList({ items }) {
  const category = useLocation().pathname.split('/')[1]
  const categories = useSelector(({ user }) => user.categories)
  const folder = useSelector(
    ({ user }) => user.folders.filter((folder) => folder.name === category)[0]
  )
  const filteredItems = items
    .filter((item) => item[category])
    .map((item) => <LinkItem key={item._id} item={item} />)
  return categories.includes(category) ? (
    filteredItems
  ) : (
    <div>
      <h1>{category}</h1>
      {folder.items.map((item) => (
        <LinkItem key={item._id} item={item} />
      ))}
    </div>
  )
}
