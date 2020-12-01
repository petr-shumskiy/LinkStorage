/* eslint-disable react/prop-types */
import React from 'react'
import './signIn.css'
import { connect } from 'react-redux'
import { Field, Form, reduxForm } from 'redux-form'
import { showSignInModal, sendSignInData } from '../../redux/userReducer'
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  makeStyles,
  Modal,
  TextField,
  Typography
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

const StyledEmailField = ({ input }) => {
  return (
    <TextField
      variant='outlined'
      margin='normal'
      required
      fullWidth
      id='email'
      label='Email Address'
      name='email'
      autoComplete='email'
      autoFocus
      onChange={input.onChange}
      value={input.value}
    />
  )
}

const StyledPassField = ({ input }) => {
  return (
    <TextField
      variant='outlined'
      margin='normal'
      required
      fullWidth
      name='password'
      label='Password'
      type='password'
      id='password'
      autoComplete='current-password'
      onChange={input.onChange}
      value={input.value}
    />
  )
}

const RememberMe = () => {
  return (
    <FormControlLabel
      control={<Checkbox value='remember' color='primary' />}
      label='Remember me'
    />
  )
}

const SignIn = ({ showSignIn, showSignInModal, handleSubmit, ...props }) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(16),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }))
  const classes = useStyles()

  return (
    <CssBaseline>
      <Modal open={showSignIn} onClose={() => showSignInModal(false)}>
        <Container
          component='main'
          maxWidth='xs'
          style={{ backgroundColor: 'white', outline: 0 }}
        >
          <CssBaseline />
          <div className={classes.paper}>
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
              />
              <Field component={RememberMe} type='checkbox' name='isRemember' />
              <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                type='submit'
              >
                Sign In
              </Button>
            </Form>
          </div>
        </Container>
      </Modal>
    </CssBaseline>
  )
}

const SingInReduxForm = reduxForm({ form: 'signIn' })(SignIn)

const SignInContainer = (props) => {
  const submitHandler = (formData) => {
    props.sendSignInData(formData)
  }
  return <SingInReduxForm onSubmit={submitHandler} {...props} />
}

const mapStateToProps = ({ user }) => ({
  showSignIn: user.showSignIn
})

export default connect(mapStateToProps, { showSignInModal, sendSignInData })(
  SignInContainer
)
