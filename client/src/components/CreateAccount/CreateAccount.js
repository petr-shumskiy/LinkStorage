/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import { Field, Form, reduxForm } from 'redux-form'
import './createAccount.css'
import {
  sendRegistrationData,
  showRegistrationModal
} from '../../redux/userReducer'

const CreateAccount = ({
  showRegistrationModal,
  showRegistration,
  handleSubmit
}) => {
  if (!showRegistration) {
    return null
  }
  return (
    <>
      (
      <div className='signIn-popup'>
        <div className='signIn-container'>
          <div className='signIn-header'>
            <h4>Create an Account</h4>
            <div
              className='close-icon'
              onClick={() => showRegistrationModal(false)}
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
                  name='email'
                  id='email'
                  type='text'
                  className='signIn-input'
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
                  id='pssword'
                  name='password'
                />
              </div>

              <div className='submit-block'>
                <button className='submitBtn' type='submit'>
                  Create Account
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      )
    </>
  )
}

const CreateAccountReduxForm = reduxForm({ form: 'registration' })(
  CreateAccount
)
const createAccountContainer = (props) => {
  const submitHandler = (formData) => {
    props.sendRegistrationData(formData)
  }
  return <CreateAccountReduxForm onSubmit={submitHandler} {...props} />
}
const mapStateToProps = ({ user }) => ({
  showRegistration: user.showRegistration
})

export default connect(mapStateToProps, {
  showRegistrationModal,
  sendRegistrationData
})(createAccountContainer)
