import React from 'react'
import { connect } from 'react-redux'
// import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import './appStart.css'
import CreateAccount from './components/CreateAccount/CreateAccount'
import SignIn from './components/SignIn/SignIn'
import {
  showRegistrationModal,
  showSignInModal,
  logOut
} from './redux/userReducer'
import propTypes from 'prop-types'

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
    return (
      <>
        <div>
          <h1>Authorized</h1>
        </div>
        <button onClick={logOut}>log out</button>
      </>
    )
  }
  return (
    <main className='start-page'>
      <header className='start-header'>
        <div className='logo'>
          <span>Link</span>
          <span>Storage</span>
        </div>
        <div className='signIn'>
          <button className='signInBtn' onClick={() => showSignInModal(true)}>
            Sign In
          </button>
          <SignIn show={showSignIn} />
          <CreateAccount show={showRegistration} />
        </div>
      </header>
      <div className='createAccount'>
        <button
          className='createAccBtn'
          onClick={() => showRegistrationModal(true)}
        >
          Create an Account
        </button>
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
