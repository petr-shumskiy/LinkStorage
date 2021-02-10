/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, reduxForm } from 'redux-form'
import {
  getIsEmailSended,
  getShowRegistrationWindow,
  getSignUpRequestInProgress,
  sendRegistrationData,
  showRegistrationModal
} from '../../redux/authReducer'
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Dialog,
  Fade,
  Tooltip,
  Typography,
  Zoom
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { authStyles } from './authModalStyles'
import { StyledEmailField, StyledPassField } from './authStylesFields'
import {
  formRequired,
  validateEmailForm,
  validatePasswordForm
} from '../../utils/validators'

const SignUp = ({ handleSubmit, pristine, valid, error }) => {
  const showRegistration = useSelector(getShowRegistrationWindow)
  const signUpRequestInProgress = useSelector(getSignUpRequestInProgress)
  const success = useSelector(getIsEmailSended)

  const dispatch = useDispatch()

  const classes = authStyles()
  const isButtonDisabled = pristine || !valid || signUpRequestInProgress

  const handleClose = () => {
    dispatch(showRegistrationModal(false))
  }

  return (
    <Dialog open={showRegistration} onClose={handleClose}>
      <Container component='main' maxWidth='xs' className={classes.main}>
        <CssBaseline />
        <div className={classes.paper}>
          {error ? (
            <div className={classes.additionalMessage}>
              <Typography component='h2' variant='h6' color='error' align='center'>
                {error}
              </Typography>
            </div>
          ) : null}
          <Avatar className={!error && success ? classes.avatarSuccess : classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Form
            onSubmit={handleSubmit}
            className={!error && success ? classes.successForm : classes.form}
          >
            {!error && success ? null : (
              <>
                <Field
                  component={StyledEmailField}
                  name='email'
                  validate={[validateEmailForm, formRequired]}
                  className={classes.wrap}
                />
                <Field
                  component={StyledPassField}
                  name='password'
                  validate={[validatePasswordForm, formRequired]}
                />
              </>
            )}
            {!error && success ? (
              <Typography component='h2' variant='h6' align='center' color='primary'>
                Email has successfully created (if you use test email - message with
                confirmation link has sent)
              </Typography>
            ) : null}

            {!error && success ? null : (
              <Tooltip
                title={isButtonDisabled ? 'input valid data' : 'create an account'}
                placement='top'
                TransitionComponent={isButtonDisabled ? Zoom : Fade}
              >
                <span>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                    disabled={isButtonDisabled}
                  >
                    {signUpRequestInProgress ? <CircularProgress /> : 'Sign Up'}
                  </Button>
                </span>
              </Tooltip>
            )}
          </Form>
        </div>
      </Container>
    </Dialog>
  )
}
const CreateAccountReduxForm = reduxForm({
  form: 'registration',
  touchOnChange: true
})(SignUp)

const SignUpContainer = () => {
  const dispatch = useDispatch()
  const submitHandler = (formData) => {
    dispatch(sendRegistrationData(formData))
  }
  return <CreateAccountReduxForm onSubmit={submitHandler} />
}

export default SignUpContainer
