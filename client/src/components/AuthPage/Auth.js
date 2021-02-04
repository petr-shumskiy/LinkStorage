import React from 'react'
import SignInContainer from './SignIn'
import SignUpContainer from './SignUp'
import { useDispatch } from 'react-redux'
import { showSignInModal, showRegistrationModal } from '../../redux/authReducer'
import { Box, Button, Container, Hidden, Typography } from '@material-ui/core'

const { makeStyles } = require('@material-ui/core/styles')

const authStyle = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  captureText: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 'auto'
    }
  },
  createAccBtn: {
    marginTop: theme.spacing(2.5),
    fontSize: '1.5em',
    color: theme.palette.primary.main,
    '&:hover': {
      color: 'white',
      backgroundColor: '#0074bf'
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '400px'
    }
  },

  learnMore: {
    marginBottom: theme.spacing(0.5),
    marginTop: 'auto',
    color: '#7a7a7a',
    '&:hover': {
      color: theme.palette.primary.light
    }
  }
}))

const Auth = () => {
  const classes = authStyle()
  const dispatch = useDispatch()

  return (
    <Container className={classes.container}>
      <SignInContainer />
      <SignUpContainer />
      <header className={classes.header}>
        <a href='/'>
          <Typography component='span' className={classes.logo_first} variant='h1'>
            Link Storage
          </Typography>
        </a>
        <Button onClick={() => dispatch(showSignInModal(true))}>
          <Typography component='span'>Sign In</Typography>
        </Button>
      </header>
      <Hidden xsDown>
        <Box display='flex' justifyContent='center'>
          <video
            className={classes.video}
            poster='https://staticinstapaper.s3.dualstack.us-west-2.amazonaws.com/img/landing_video_poster.png?v=50d326ce8be7c42394e5dbbc6ab3416f'
            autoPlay
            muted
            loop
          >
            <source
              src='https://staticinstapaper.s3.dualstack.us-west-2.amazonaws.com/video/ip_landing_video_350kbps.mp4'
              type='video/mp4'
            />
            <source
              src='https://staticinstapaper.s3.dualstack.us-west-2.amazonaws.com/video/ip_landing_video_350kbps.webmhd.webm'
              type='video/webm'
            />
            <img
              src='https://staticinstapaper.s3.dualstack.us-west-2.amazonaws.com/img/landing_video_fallback.png?v=31344dfe9a03236613496fcb89f096c7'
              alt=''
            />
          </video>
        </Box>
      </Hidden>
      <Typography
        variant='h2'
        style={{ fontSize: '3.5rem', textAlign: 'center' }}
        className={classes.captureText}
      >
        Save Anything. Read Anywhere.
      </Typography>
      <Button
        variant='outlined'
        className={classes.createAccBtn}
        color='primary'
        onClick={() => dispatch(showRegistrationModal(true))}
      >
        <Typography
          color='inherit'
          fontSize='inherit'
          variant='h4'
          style={{ textTransform: 'none' }}
        >
          Create an Account
        </Typography>
      </Button>
      <a href='https://github.com/MaxKalinin92/LinkStorage' className={classes.learnMore}>
        <Typography variant='subtitle2' color='inherit'>
          learn more
        </Typography>
      </a>
    </Container>
  )
}

export default Auth
