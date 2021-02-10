/* eslint-disable @typescript-eslint/no-use-before-define */
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { Form, reset, stopSubmit } from 'redux-form'
import { AuthAPI } from '../API/AuthAPI'
import { State } from './authReducer.types'
import { handleError } from './errorService'

const initialState: State = {
  isEmailSended: false,
  validationError: null,
  showRegistration: false,
  showSignIn: false,
  email: null || localStorage.getItem('email'),
  token: null || localStorage.getItem('token'),
  signInRequestInProgress: false,
  signUpRequestInProgress: false
}

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showRegistrationModal(state: State, action: PayloadAction<boolean>) {
      state.showRegistration = action.payload
    },
    showSignInModal(state: State, action: PayloadAction<boolean>) {
      state.showSignIn = action.payload
    },
    setToken(state: State, action: PayloadAction<string>) {
      state.token = action.payload
    },
    login(state: State, action: PayloadAction<string>) {
      state.email = action.payload
    },
    logout(state: State) {
      ;['token', 'theme', 'email'].forEach((item) => localStorage.removeItem(item))
      state.token = null
    },
    toggleEmailSended(state: State) {
      state.isEmailSended = !state.isEmailSended
    },
    toggleProgressSignIn(state: State) {
      state.signInRequestInProgress = !state.signInRequestInProgress
    },
    toggleProgressSignUp(state: State) {
      state.signUpRequestInProgress = !state.signUpRequestInProgress
    },
    setValidationError(state: State, action: PayloadAction<string>) {
      state.validationError = action.payload
    }
  }
})

export const sendRegistrationData = (data: Form<{ email: string, password: string }>) => async (
  dispatch: Dispatch<AnyAction>
) => {
  dispatch(toggleProgressSignUp())
  try {
    await new AuthAPI().sendRegistrationData(data)
    dispatch(toggleEmailSended())
    dispatch(reset('registration'))
    setTimeout(() => {
      dispatch(toggleEmailSended())
    }, 10000)
  } catch (error) {
    if (error.response?.data) {
      dispatch(stopSubmit('registration', { _error: error.response.data.message }))
    } else {
      handleError(error, dispatch)
    }
  } finally {
    dispatch(toggleProgressSignUp())
  }
}

export const sendSignInData = (data: { email: string, password: string }) => async (
  dispatch: Dispatch<AnyAction>
) => {
  dispatch(toggleProgressSignIn())
  try {
    const res = await new AuthAPI().sendSignInData(data)
    dispatch(login(data.email))
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('email', data.email)
    dispatch(setToken(res.data.token))
  } catch (error) {
    dispatch({ type: 'RESET_SIGN_IN_PASSWORD' })
    if (error.response && error.response.data) {
      dispatch(stopSubmit('signIn', { _error: error.response.data.message }))
    } else {
      handleError(error, dispatch)
    }
  } finally {
    dispatch(toggleProgressSignIn())
  }
}

export const validateEmail = (confirmationToken: string) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res = await new AuthAPI().sendConfirmationRequest(confirmationToken)
    dispatch(login(res.data.email))
    localStorage.setItem('token', confirmationToken)
    localStorage.setItem('email', res.data.email)
    dispatch(setToken(confirmationToken))
  } catch (error) {
    if (error.response?.data) {
      dispatch(setValidationError(error.response.data.message))
    }
    handleError(error, dispatch)
  }
}

// Selectors
export const getToken = ({ auth }: { auth: State }) => auth.token
export const getError = ({ auth }: { auth: State }) => auth.validationError
export const getEmail = ({ auth }: { auth: State }) => auth.email
export const getShowSignIn = ({ auth }: { auth: State }) => auth.showSignIn
export const getSignInRequestInProgress = ({ auth }: { auth: State }) => auth.signInRequestInProgress
export const getSignUpRequestInProgress = ({ auth }: { auth: State }) => auth.signUpRequestInProgress
export const getShowRegistrationWindow = ({ auth }: { auth: State }) => auth.showRegistration
export const getIsEmailSended = ({ auth }: { auth: State }) => auth.isEmailSended

export const {
  showRegistrationModal,
  showSignInModal,
  toggleEmailSended,
  login,
  logout,
  setToken,
  toggleProgressSignIn,
  toggleProgressSignUp,
  setValidationError
} = authReducer.actions

export default authReducer.reducer
