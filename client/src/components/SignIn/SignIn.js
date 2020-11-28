/* eslint-disable react/prop-types */
import React from 'react'
import './signIn.css'
import { connect } from 'react-redux'
import { Field, Form, reduxForm } from 'redux-form'
import { showSignInModal, sendSignInData } from '../../redux/userReducer'

const SignIn = reduxForm({ form: 'signIn' })(
  ({ showSignIn, showSignInModal, handleSubmit }) => {
    if (!showSignIn) {
      return null
    }

    return (
      <>
        <div className='signIn-popup'>
          <div className='signIn-container'>
            <div className='signIn-header'>
              <h4>Sign In</h4>
              <div
                className='close-icon'
                onClick={() => showSignInModal(false)}
              >
                x
              </div>
            </div>

            <div className='form-container'>
              <Form onSubmit={handleSubmit}>
                <div className='mail-form'>
                  <label className='signIn-label' htmlFor='email'>
                    Email
                  </label>
                  <Field
                    component='input'
                    className='signIn-input'
                    type='text'
                    id='email'
                    name='email'
                  />
                </div>

                <div className='mail-form'>
                  <label className='signIn-label' htmlFor='password'>
                    Password
                  </label>
                  <Field
                    component='input'
                    className='signIn-input'
                    type='password'
                    id='password'
                    name='password'
                  />
                </div>

                <div className='submit-block'>
                  <button className='submitBtn' type='submit'>
                    Sign In
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </>
    )
  }
)

const SignInContainer = (props) => {
  const onSubmit = (formData) => {
    props.sendSignInData(formData)
  }
  return <SignIn onSubmit={onSubmit} {...props} />
}

const mapStateToProps = ({ user }) => ({
  showSignIn: user.showSignIn
})

export default connect(mapStateToProps, { showSignInModal, sendSignInData })(
  SignInContainer
)
