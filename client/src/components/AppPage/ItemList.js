import {
  Box,
  Button,
  Container,
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
import { deleteItemThunk, updateItemThunk } from '../../redux/userReducer'

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

function FoldersMenu({ anchorEl, onMenuClosed, onAddItemToFolder, category }) {
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
      {category !== 'home' ? (
        <MenuItem
          onClick={() => {
            onAddItemToFolder('home')
            onMenuClosed()
          }}
        >
          Home
        </MenuItem>
      ) : null}
      {folders.map((folder) => {
        return folder.name !== category ? (
          <MenuItem
            key={folder._id}
            onClick={() => {
              onMenuClosed()
              onAddItemToFolder(folder._id)
            }}
          >
            {folder.name}
          </MenuItem>
        ) : null
      })}
    </Menu>
  )
}

function ItemActions({
  isActive,
  onItemDeleted,
  onAddItemToFolder,
  onItemLiked,
  isItemLiked,
  onItemArchived,
  isItemArchived,
  category
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
              onItemDeleted()
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
        category={category}
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
        {category === 'liked' ? null : (
          <StyledIconButton onClick={onItemArchived}>
            {isItemArchived ? (
              <ArchiveRounded fontSize='inherit' color='primary' />
            ) : (
              <ArchiveRounded fontSize='inherit' />
            )}
          </StyledIconButton>
        )}
        <StyledIconButton onClick={() => setIsOpen(true)}>
          <DeleteRounded fontSize='inherit' />
        </StyledIconButton>
      </div>
    </>
  )
}

function DateOfTitle({ isActive, isItemLiked }) {
  const marginLeft = isActive && !isItemLiked ? 12 : 0
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

function LinkItem({ item, category }) {
  const { _id: id, url, title, description, logoUrl } = item
  const classes = useStyle()
  const dispatch = useDispatch()
  const token = useSelector(({ auth }) => auth.token)

  const [isActive, setActive] = useState(false)

  const handleDeleteItem = () => {
    dispatch(deleteItemThunk(id, token))
  }

  const handleAddItemToFolder = (folderId) => {
    dispatch(updateItemThunk(id, { folderId }, token))
  }

  const handleLikeItem = () => {
    dispatch(updateItemThunk(id, { liked: !item.liked }, token))
  }

  const handleArchiveItem = () => {
    dispatch(updateItemThunk(id, { archived: !item.archived }, token))
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
              onItemDeleted={handleDeleteItem}
              onAddItemToFolder={handleAddItemToFolder}
              onItemLiked={handleLikeItem}
              isItemLiked={item.liked}
              onItemArchived={handleArchiveItem}
              isItemArchived={item.archived}
              category={category}
            />
            <StyledIconButton
              style={{
                display: [item.liked && !isActive ? '' : 'none']
              }}
            >
              <Favorite fontSize='inherit' color='primary' />
            </StyledIconButton>
            <DateOfTitle isActive={!isActive} isItemLiked={item.liked} />
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

function NoContent({ label }) {
  return (
    <>
      <Box
        minHeight={label ? 150 : 'calc(134px - 1rem)'}
        display='flex'
        alignItems='center'
        direction='column'
        justifyContent='center'
      >
        <Typography variant='body1' style={{ opacity: 0.7 }}>
          {label
            ? `You have no ${label} items.`
            : 'No articles in this folder.'}
        </Typography>
      </Box>
      <Divider />
    </>
  )
}

function FolderTitle({ label }) {
  return (
    <Box display='flex' alignItems='center' marginBottom='1rem'>
      <Typography variant='h3'>{label}</Typography>
      <StyledButton
        type='small'
        style={{
          marginLeft: '1rem',
          padding: '6px 4px',
          minWidth: 40,
          height: 24
        }}
      >
        <Typography variant='subtitle2' color='inherit'>
          Edit
        </Typography>
      </StyledButton>
    </Box>
  )
}

export function ItemsList({ items }) {
  const category = useLocation().pathname.split('/')[1]
  const categories = useSelector(({ user }) => user.categories)

  const folders = useSelector(({ user }) => user.folders)
  const folder = folders.filter((folder) => folder.name === category)[0]

  const currentCategoryItems = items
    .filter((item) => item[category])
    .map((item) => <LinkItem key={item._id} item={item} category={category} />)

  const likedItemsInFolders = []
  for (const folder of folders) {
    for (const item of folder.items) {
      if (item.liked) {
        likedItemsInFolders.push(
          <LinkItem key={item._id} item={item} category={category} />
        )
      }
    }
  }

  if (category === 'liked') {
    return [...currentCategoryItems, likedItemsInFolders]
  }

  const currentFolderItems =
    folder && folder.items.length ? (
      <>
        <FolderTitle label={folder.name} />
        {folder.items.map((item) => {
          return <LinkItem key={item._id} item={item} category={folder.name} />
        })}
      </>
    ) : null

  if (!currentCategoryItems.length && categories.includes(category)) {
    return <NoContent label={category} />
  }

  if (folder && !folder.items.length) {
    return (
      <>
        <FolderTitle label={folder.name} />
        <NoContent label='' />
      </>
    )
  }

  return categories.includes(category)
    ? currentCategoryItems
    : currentFolderItems
}
