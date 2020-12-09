import React from 'react'
import SignInContainer from '../SignIn/SignIn'
import SignUpContainer from '../SignUp/SignUp'
import { useDispatch } from 'react-redux'
import { showSignInModal, showRegistrationModal } from '../../redux/authReducer'
import { Button, Typography } from '@material-ui/core'

const { makeStyles } = require('@material-ui/core/styles')

const authStyle = makeStyles((theme) => ({
  startHeader: {
    padding: '10px 15px 7px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },

  logo_first: {
    color: 'red'
  },

  signInBtn: {
    fontSize: '1rem',
    background: 'none',
    outline: 'none',
    alignSelf: 'center'
  },

  createAccount: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },

  createAccBtn: {
    wordBreak: 'keep-all',
    color: '#0074bf',
    '&:hover': {
      color: 'white',
      backgroundColor: '#0074bf'
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '400px'
    }
  }
}))

const Auth = () => {
  const classes = authStyle()
  const dispatch = useDispatch()

  return (
    <main>
      <header className={classes.startHeader}>
        <div className={classes.logo}>
          <span className={classes.logo_first}>Link</span>
          <span>Storage</span>
        </div>
        <div className={classes.signInBtn}>
          <Button onClick={() => dispatch(showSignInModal(true))}>
            <Typography component='span'>Sign In</Typography>
          </Button>
          <SignInContainer />
          <SignUpContainer />
        </div>
      </header>
      <div className={classes.createAccount}>
        <Button
          variant='contained'
          className={classes.createAccBtn}
          onClick={() => dispatch(showRegistrationModal(true))}
        >
          <Typography component='span'>Create an Account</Typography>
        </Button>
      </div>
    </main>
  )
}

export default Auth
