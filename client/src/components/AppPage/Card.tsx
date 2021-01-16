import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

// import Card from '@material-ui/core/Card'
// import { CardMedia, Link, CardContent, IconButton, Typography, Box } from '@material-ui/core'
import { IconButton, Box } from '@material-ui/core'

import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FavoriteIcon from '@material-ui/icons/Favorite'
import VideoLibrarySharpIcon from '@material-ui/icons/VideoLibrarySharp'
// import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import FolderIcon from '@material-ui/icons/Folder'

import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch } from 'react-redux'
import { deleteItemThunk, Item, updateItemThunk } from '../../redux/userReducer'
const { ReactTinyLink } = require('react-tiny-link')

interface IReactTinyLinkData {
  description: string
  image: string[]
  title: string
  video: string[]
  url: string
}

const cardStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 96px)',
    maxWidth: '100%'
  },
  content: {
    flex: '1 0 auto',
    textAlign: 'justify'
  },
  text: {
    wordBreak: 'break-all'
  },
  cover: {
    alignSelf: 'center',
    width: '80px',
    height: '80px',
    marginRight: '16px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}))
const Card = (props: Item) => {
  const { _id, url, archived, home, liked } = props
  const classes = cardStyles()
  const dispatch = useDispatch()

  const onLikeHandler = () => {
    dispatch(updateItemThunk(_id, { id: _id, liked: !liked }))
  }

  const onArchiveHandler = () => {
    dispatch(updateItemThunk(_id, { id: _id, archived: !archived }))
  }

  return (
    <Box>
      <ReactTinyLink
        cardSize='small'
        showGraphic={true}
        maxLine={4}
        minLine={1}
        url={url}
        autoPlay
      />{' '}
      <div className={classes.details}>
        <div className={classes.controls}>
          {liked ? (
            <IconButton onClick={onLikeHandler}>
              <FavoriteIcon color='primary' />
            </IconButton>
          ) : (
            <>
              <IconButton onClick={onLikeHandler}>
                <FavoriteBorderOutlinedIcon />
              </IconButton>
              <IconButton onClick={onArchiveHandler}>
                <ArchiveOutlinedIcon />
              </IconButton>
            </>
          )}
          <IconButton>
            <VideoLibrarySharpIcon />
          </IconButton>
          <IconButton onClick={() => dispatch(deleteItemThunk(_id))}>
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <FolderIcon />
          </IconButton>
        </div>
      </div>
    </Box>
  )
}

export default Card

// {
/* <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {data.title}
          </Typography>
          <Typography className={classes.text} variant="subtitle2" color="textSecondary">
          {data.text}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <Link >
              {data.url}
            </Link>
          </Typography>
        </CardContent>
      <CardMedia
        className={classes.cover}
        image={data.img}
        title="Live from space album cover"
      />
    </Card> */
// }
