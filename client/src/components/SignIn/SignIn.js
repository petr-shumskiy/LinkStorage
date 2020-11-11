/* eslint-disable react/prop-types */
import React from 'react'
import './signIn.css'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/action'

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

    submitHandler = (event) => {
      event.preventDefault()
      const { email, password } = this.state
      if (!email.trim()) {
        return
      }

      const user = {
        email,
        password
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
          {this.props.show && (
            <div className="signIn-popup">
              <div className="signIn-container">

                <div className="signIn-header">
                  <h4>Sign In</h4>
                  <div className="close-icon"
                  onClick={this.props.onHide}
                  >x</div>
                </div>

                <div className="form-container">
                  <form onSubmit={this.submitHandler} method="post">

                    <div className="mail-form">
                      <label className="signIn-label" htmlFor="email">Email</label>
                      <input
                      className="signIn-input"
                      type="text"
                      id="email"
                      value={this.state.email}
                      name="email"
                      onChange={this.changeInputHandler}
                      />
                    </div>

                    <div className="mail-form">
                      <label className="signIn-label" htmlFor="password">Password</label>
                      <input className="signIn-input"
                      type="password"
                      id="password"
                      value={this.state.password}
                      name="password"
                      onChange={this.changeInputHandler}
                      />
                    </div>

                    <div className="submit-block">
                      <button className="submitBtn" type="submit">Sign In</button>
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

export default connect(null, mapDispatchToProps)(SignIn)
