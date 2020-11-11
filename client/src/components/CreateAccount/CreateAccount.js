/* eslint-disable react/prop-types */
import React from 'react'
import './createAccount.css'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/action'

class CreateAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newEmail: '',
      newPassword: ''
    }
  }

  submitHandler = (event) => {
    event.preventDefault()
    const { newEmail, newPassword } = this.state
    if (!newEmail.trim()) {
      return
    }

    const user = {
      newEmail,
      newPassword
    }

    console.log(user)
    this.props.loginUser(user)

    // this.setState({ email: '', password: ''})
  }

  changeInputHandler = (event) => {
    event.persist()
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value
      }
    }))
  }

  render() {
    return (
        <React.Fragment>
          {(this.props.show === 'createAccount') && (
            <div className="signIn-popup">
              <div className="signIn-container">

                <div className="signIn-header">
                  <h4>Create an Account</h4>
                  <div className="close-icon"
                  onClick={() => { this.props.onHideCreateAccount() }}
                  >x</div>
                </div>

                <div className="form-container">
                  <form onSubmit={this.submitHandler} method="post">

                    <div className="mail-form">
                      <label className="signIn-label" htmlFor="email">Email</label>
                      <input
                      className="signIn-input"
                      type="text"
                      id="newEmail"
                      value={this.state.newEmail}
                      name="newEmail"
                      onChange={this.changeInputHandler}
                      />
                    </div>

                    <div className="mail-form">
                      <label className="signIn-label" htmlFor="newPassword">Password</label>
                      <input className="signIn-input"
                      type="Password"
                      id="newPassword"
                      value={this.state.newPassword}
                      name="newPassword"
                      onChange={this.changeInputHandler}
                      />
                    </div>

                    <div className="submit-block">
                      <button className="submitBtn" type="submit">Create Account</button>
                    </div>

                  </form>
                </div>

              </div>
            </div>
          )}
        </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  loginUser
}

export default connect(null, mapDispatchToProps)(CreateAccount)
