import {
  Button,
  Divider,
  Grid,
  Hidden,
  IconButton,
  Typography
} from '@material-ui/core'
import { createStyles, makeStyles, styled } from '@material-ui/core/styles'
import React, { useState } from 'react'
import FolderIcon from '@material-ui/icons/Folder'
import {
  ArchiveRounded,
  DeleteRounded,
  FavoriteBorderOutlined
} from '@material-ui/icons'
import { theme } from '../../theme'

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
      '&:hover': {
        opacity: 1,
        color: theme.palette.primary.main,
        cursor: 'pointer'
      }
    },
    bgImage: {
      height: '100%',
      width: '100%',
      borderRadius: theme.shape.borderRadius,
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      [theme.breakpoints.down('sm')]: {
        height: '80%'
      }
    }
  })
)

const StyledIconButton = styled(IconButton)(customStyles)

const StyledButton = styled(Button)(customStyles)

function ItemActions({ isActive }) {
  return (
    <div style={{ display: [isActive ? '' : 'none'] }}>
      <StyledIconButton>
        <FavoriteBorderOutlined fontSize='inherit' />{' '}
      </StyledIconButton>
      <StyledIconButton>
        <FolderIcon fontSize='inherit' />{' '}
      </StyledIconButton>
      <StyledIconButton>
        <ArchiveRounded fontSize='inherit' />{' '}
      </StyledIconButton>
      <StyledIconButton>
        <DeleteRounded fontSize='inherit' />{' '}
      </StyledIconButton>
    </div>
  )
}

function DateOfTitle({ isActive }) {
  return (
    <div
      style={{
        display: [isActive ? 'block' : 'none']
      }}
    >
      <Typography variant='subtitle2'>
        {new Date().toLocaleDateString()}
      </Typography>
    </div>
  )
}

function LinkItem() {
  const classes = useStyle()
  const [isActive, setActive] = useState(false)
  return (
    <div
      onMouseOver={() => setActive(true)}
      onMouseOut={() => setActive(false)}
    >
      <Grid
        container
        item
        xs={12}
        md={12}
        style={{
          color: 'black',
          paddingLeft: '1rem'
        }}
      >
        <Grid
          container
          item
          md={8}
          sm={7}
          xs={12}
          direction='column'
          style={{
            position: 'relative'
          }}
        >
          <StyledButton
            // size="small"
            style={{
              display: [isActive ? 'block' : 'none'],
              position: 'absolute',
              top: 0,
              right: '8%'
            }}
          >
            <Typography variant='body1' color='inherit'>
              edit
            </Typography>
          </StyledButton>

          <Grid item>
            <Typography variant='h2'> Title</Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1' classes={{ root: classes.root }}>
              subtitle.org
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              quaerat ab dignissimos minus id ut recusandae reiciendis
              doloremque itaque in!
            </Typography>
          </Grid>
          <Grid
            item
            container
            alignItems='center'
            style={{ minHeight: '40px' }}
          >
            <ItemActions isActive={isActive} />
            <DateOfTitle isActive={!isActive} />
          </Grid>
        </Grid>
        <Hidden only={['xs']}>
          <Grid
            item
            container
            md={4}
            sm={4}
            xs={false}
            style={{ padding: 5 }}
            justify='center'
            alignItems='center'
          >
            <div className={classes.bgImage}></div>
          </Grid>
        </Hidden>
      </Grid>
      <Divider
        style={{
          backgroundColor: 'black',
          width: '100%',
          margin: '0.5rem 0 1rem 1rem',
          opacity: 0.2
        }}
      />
    </div>
  )
}

export function ItemsList() {
  return [1, 2, 3, 4].map((key) => {
    return <LinkItem key={key} />
  })
}
