import React, { Component } from 'react'
// import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import './appStart.css'
import SignIn from './components/SignIn/SignIn'

class AppStart extends Component {
  state = {
    showModal: false
  }

  getModal = () => {
    this.setState({ showModal: true })
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
            onClick={() => this.getModal()}>Sign In
          </button>
          <SignIn
            show={this.state.showModal}
            onHide={this.hideModal}
          />
        </div>
      </header>
      <div className="createAccount">
        <button className="createAccBtn">Create an Account</button>
      </div>
      <div >

      </div>
    </main>
    )
  }
}

export default AppStart
