import React from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import {
  CardMedia,
  Link,
  CardContent,
  IconButton,
  Typography
} from '@material-ui/core'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import VideoLibrarySharpIcon from '@material-ui/icons/VideoLibrarySharp'
import cardStyle from './cardStyle'

const Cards = (data) => {
  const classes = cardStyle()

  return (
    <Card className={classes.root}>
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
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={data.img}
        title="Live from space album cover"
      />
    </Card>
  )
}

const mapStateToProps = ({ user }) => ({
  linksData: user.linksData
})

export default connect(mapStateToProps, {})(Cards)
