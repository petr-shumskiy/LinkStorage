import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ReactTinyLink } from 'react-tiny-link'
// import Card from '@material-ui/core/Card'
// import { CardMedia, Link, CardContent, IconButton, Typography, Box } from '@material-ui/core'
import { IconButton, Box } from '@material-ui/core'

import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import VideoLibrarySharpIcon from '@material-ui/icons/VideoLibrarySharp'
import DeleteIcon from '@material-ui/icons/Delete'

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

const Cards = ({ url }) => {
  const classes = cardStyles()

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
          onSuccess={(data) => {}}
        />
        <div className={classes.controls}>
          <IconButton>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
          <IconButton>
            <ArchiveOutlinedIcon />
          </IconButton>
          <IconButton>
            <VideoLibrarySharpIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </Box>
  )
}

export default Cards
