import {
  Box,
  createStyles,
  Divider,
  Grid,
  Hidden,
  makeStyles,
  Typography
} from '@material-ui/core'
import { Favorite } from '@material-ui/icons'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteItemThunk, updateItemStatusThunk } from '../../../../redux/userReducer'
import { theme } from '../../../../theme'
import { EditButton } from './EditButton'
import { DateOfTitle } from './ItemActions/DateOfTitle'
import { ItemActions } from './ItemActions/ItemActions'
import { StyledIconButton } from './ItemActions/StyledButtons'

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
      height: '100%',
      width: '100%',
      borderRadius: theme.shape.borderRadius,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain'
    },
    hide: {
      display: 'none'
    },
    restrictedMaxWidth: {
      maxWidth: '100%'
    }
  })
)

export function Item({ item, category }) {
  const { _id: id, url, title, description, logoUrl } = item
  const classes = useStyle()
  const dispatch = useDispatch()

  const [isActive, setActive] = useState(false)

  const handleMouseEnter = (e) => {
    setActive(true)
  }

  const handleMouseLeave = (e) => {
    setActive(false)
  }

  const handleDeleteItem = () => {
    dispatch(deleteItemThunk(id))
  }

  const handleAddItemToFolder = (folderId) => {
    dispatch(updateItemStatusThunk({ id, folderId }))
  }

  const handleLikeItem = () => {
    dispatch(updateItemStatusThunk({ id, liked: !item.liked }))
  }

  const handleArchiveItem = () => {
    dispatch(updateItemStatusThunk({ id, archived: !item.archived }))
  }

  return (
    <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Grid container spacing={1} item xs={12} md={12} style={{ color: 'black' }}>
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
          <EditButton
            isActive={isActive}
            item={item}
            onCloseEditDialog={() => setActive(false)}
          />
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
            <a href={url} style={{ textDecoration: 'none' }}>
              <Typography variant='subtitle1' classes={{ root: classes.root }}>
                {url}
              </Typography>
            </a>
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
              item={item}
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
            <Box
              className={classes.bgImage}
              style={{
                backgroundImage: 'url(' + logoUrl + ')'
              }}
            ></Box>
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
    </Box>
  )
}
