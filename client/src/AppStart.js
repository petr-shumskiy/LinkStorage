import React, { Component } from 'react'
// import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import './appStart.css'
import CreateAccount from './components/CreateAccount/CreateAccount'
import SignIn from './components/SignIn/SignIn'

class AppStart extends Component {
  state = {
    showModal: false
  }

  getModal = (value) => {
    this.setState({ showModal: value })
  };

  hideModal = () => {
    this.setState({ showModal: false })
  };

  render() {
    return (
    <main className="start-page">
      <header className="start-header">
        <div className="logo">
          <span>Link</span><span>Storage</span>
        </div>
        <div className="signIn">
          <button
            className="signInBtn"
            onClick={() => this.getModal('signIn')}>Sign In
          </button>
          <SignIn
            show={this.state.showModal}
            onHideSignIn={this.hideModal}
          />
          <CreateAccount
            show={this.state.showModal}
            onHideCreateAccount={this.hideModal}
          />
        </div>
      </header>
      <div className="createAccount">
        <button
          className="createAccBtn"
          onClick={() => this.getModal('createAccount')}>Create an Account
        </button>
      </div>

    </main>
    )
  }
}

export default AppStart
