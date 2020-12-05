import React from 'react'
import { connect } from 'react-redux'
// import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import CreateAccount from './components/CreateAccount/CreateAccount'
import SignIn from './components/SignIn/SignIn'
import Main from './components/pages/Main/Main'
import {
  showRegistrationModal,
  showSignInModal,
  logOut
} from './redux/userReducer'
import propTypes from 'prop-types'
import { Button, Typography } from '@material-ui/core'
import authStyle from './appStartStyles'

const AppStart = ({
  token,
  showRegistration,
  showSignIn,
  showSignInModal,
  showRegistrationModal,
  logOut,
  location
}) => {
  if (token || localStorage.getItem('token')) {
    return <Main />
  }

  const classes = authStyle()

  return (
    <main>
      <header className={classes.startHeader}>
        <div className={classes.logo}>
          <span className={classes.logo_first}>Link</span>
          <span>Storage</span>
        </div>
        <div className={classes.signInBtn}>
          <Button onClick={() => showSignInModal(true)}>
            <Typography component="span">Sign In</Typography>
          </Button>
          <SignIn />
          <CreateAccount />
        </div>
      </header>
      <div className={classes.createAccount}>
        <Button
          variant="contained"
          className={classes.createAccBtn}
          onClick={() => showRegistrationModal(true)}
        >
          <Typography component="span">Create an Account</Typography>
        </Button>
      </div>
    </main>
  )
}

const mapStateToProps = ({ user }) => ({
  token: user.token,
  showRegistration: user.showRegistration,
  showSignIn: user.showSignIn
})

export default connect(mapStateToProps, {
  showRegistrationModal,
  showSignInModal,
  logOut
})(AppStart)

AppStart.propTypes = {
  token: propTypes.string,
  showRegistration: propTypes.bool,
  showSignIn: propTypes.bool,
  showSignInModal: propTypes.func,
  showRegistrationModal: propTypes.func,
  logOut: propTypes.func,
  location: propTypes.object
}
