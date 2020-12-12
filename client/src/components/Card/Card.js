import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ReactTinyLink } from 'react-tiny-link'
// import Card from '@material-ui/core/Card'
// import { CardMedia, Link, CardContent, IconButton, Typography, Box } from '@material-ui/core'
import { IconButton, Box } from '@material-ui/core'

import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FavoriteIcon from '@material-ui/icons/Favorite'
import VideoLibrarySharpIcon from '@material-ui/icons/VideoLibrarySharp'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'
import {
  cacheItemData,
  deleteItemThunk,
  toggleArchiveItemThunk,
  toggleLikeItemThunk
} from '../../redux/userReducer'

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
const Card = ({ _id, url, archived, home, liked }) => {
  const classes = cardStyles()
  const dispatch = useDispatch()
  const token = useSelector(({ auth }) => auth.token)

  const likeHandler = (id) => {
    dispatch(toggleLikeItemThunk(id))
  }

  const archiveHandler = (id) => {
    dispatch(toggleArchiveItemThunk(id))
  }

  return (
    <Box>
      <div className={classes.details}>
        <ReactTinyLink
          cardSize='small'
          showGraphic={true}
          maxLine={4}
          minLine={1}
          autoPlay
          url={url}
          onSuccess={(data) => dispatch(cacheItemData(data, _id))}
        />
        <div className={classes.controls}>
          {liked ? (
            <IconButton onClick={() => likeHandler(_id)}>
              <FavoriteIcon color='primary' />
            </IconButton>
          ) : (
            <>
              <IconButton onClick={() => likeHandler(_id)}>
                <FavoriteBorderOutlinedIcon />
              </IconButton>
              <IconButton onClick={() => archiveHandler(_id)}>
                <ArchiveOutlinedIcon />
              </IconButton>
            </>
          )}
          <IconButton>
            <VideoLibrarySharpIcon />
          </IconButton>
          <IconButton onClick={() => dispatch(deleteItemThunk(_id, token))}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </Box>
  )
}

export default Card
