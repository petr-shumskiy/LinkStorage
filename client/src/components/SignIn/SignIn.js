import React from 'react'
import './signIn.css'
import { connect } from 'react-redux'
import { Field, Form, reduxForm } from 'redux-form'
import { showSignInModal, sendSignInData } from '../../redux/userReducer'
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Dialog,
  Typography
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { authStyles } from '../authModalStyles'
import {
  RememberMe,
  StyledEmailField,
  StyledPassField
} from '../authStylesFields'
import { formRequired } from '../../utils/validators'

const SignIn = ({
  showSignIn,
  showSignInModal,
  handleSubmit,
  pristine,
  valid,
  error,
  signInRequestInProgress
}) => {
  const classes = authStyles()
  return (
    <Dialog open={showSignIn} onClose={() => showSignInModal(false)}>
      <Container component='main' maxWidth='xs' className={classes.main}>
        <CssBaseline />
        <div className={classes.paper}>
          {error ? (
            <div className={classes.additionalMessage}>
              <Typography
                component='h2'
                variant='h6'
                color='error'
                align='center'
              >
                {error}
              </Typography>
            </div>
          ) : null}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Form onSubmit={handleSubmit} className={classes.form}>
            <Field component={StyledEmailField} name='email' />
            <Field
              component={StyledPassField}
              name='password'
              type='password'
              validate={[formRequired]}
            />
            <Field component={RememberMe} type='checkbox' name='isRemember' />
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              type='submit'
              validate={[formRequired]}
              disabled={pristine || !valid || signInRequestInProgress}
            >
              {signInRequestInProgress ? <CircularProgress /> : 'Sign In'}
            </Button>
          </Form>
        </div>
      </Container>
    </Dialog>
  )
}

const SingInReduxForm = reduxForm({ form: 'signIn', touchOnChange: true })(
  SignIn
)

const SignInContainer = (props) => {
  const submitHandler = (formData) => {
    props.sendSignInData(formData)
  }
  return <SingInReduxForm onSubmit={submitHandler} {...props} />
}

const mapStateToProps = ({ user }) => ({
  showSignIn: user.showSignIn,
  signInRequestInProgress: user.signInRequestInProgress
})

export default connect(mapStateToProps, { showSignInModal, sendSignInData })(
  SignInContainer
)
