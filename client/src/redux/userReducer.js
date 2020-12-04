import { reset, stopSubmit } from 'redux-form'
import { API } from '../API/API'
import {
  LOGIN_USER,
  SHOW_SIGN_IN,
  SHOW_REGISTRATION,
  SET_TOKEN,
  LOG_OUT,
  LOAD_LINK_DATA,
  SET_LINK_TYPE,
  TOGGLE_EMAIL_SENDED,
  TOGGLE_PROGRESS_SIGN_IN,
  TOGGLE_PROGRESS_SIGN_UP,
  RESET_SIGN_IN_PASSWORD
} from './types'

const initialState = {
  isEmailSended: false,
  showRegistration: false,
  showSignIn: false,
  email: null,
  token: null,
  linksData: [],
  linkType: '',
  signInRequestInProgress: false,
  signInRequestUpProgress: false
}

export const userReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case SHOW_REGISTRATION:
      return {
        ...state,
        showRegistration: payload.value
      }
    case SHOW_SIGN_IN:
      return {
        ...state,
        showSignIn: payload.value
      }
    case TOGGLE_EMAIL_SENDED:
      return {
        ...state,
        isEmailSended: payload.data
      }
    case LOGIN_USER:
      return { ...state, user: payload }
    case SET_TOKEN: {
      return {
        ...state,
        token: payload.token
      }
    }
    case SET_LINK_TYPE: {
      return {
        ...state,
        linkType: payload.linkType
      }
    }
    case LOG_OUT:
      return {
        ...state,
        token: null
      }
    case LOAD_LINK_DATA:
      return {
        ...state,
        linksData: payload.linksData
      }
    case TOGGLE_PROGRESS_SIGN_IN:
      return {
        ...state,
        signInRequestInProgress: !state.signInRequestInProgress
      }
    case TOGGLE_PROGRESS_SIGN_UP:
      return {
        ...state,
        signUpRequestInProgress: !state.signUpRequestInProgress
      }
    default:
      return state
  }
}

export const showRegistrationModal = (value) => ({
  type: SHOW_REGISTRATION,
  payload: {
    value
  }
})

export const showSignInModal = (value) => ({
  type: SHOW_SIGN_IN,
  payload: {
    value
  }
})

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: {
    token
  }
})

export const setCurrentLinkType = (linkType) => ({
  type: SET_LINK_TYPE,
  payload: {
    linkType
  }
})

export const logOut = () => {
  localStorage.removeItem('token')
  return {
    type: LOG_OUT
  }
}

export const resetSignInPassword = () => {
  return {
    type: RESET_SIGN_IN_PASSWORD
  }
}

export const loadLinkData = (linksData) => ({
  type: LOAD_LINK_DATA,
  payload: {
    linksData
  }
})

export const toggleEmailSended = (data) => ({
  type: TOGGLE_EMAIL_SENDED,
  payload: {
    data
  }
})

export const toggleProgressSignIn = () => ({
  type: TOGGLE_PROGRESS_SIGN_IN
})

export const toggleProgressSignUp = () => ({
  type: TOGGLE_PROGRESS_SIGN_UP
})

export const sendRegistrationData = (data) => (dispatch) => {
  dispatch(toggleProgressSignUp())
  // FIXME refactor with async/await
  return API.sendRegistrationData(data)
    .then((res) => {
      dispatch(toggleProgressSignUp())
      dispatch(toggleEmailSended(res.data.message))
      dispatch(reset('registration'))
      setTimeout(() => {
        dispatch(toggleEmailSended(false))
      }, 6000)
    })
    .catch((err) => {
      dispatch(
        stopSubmit('registration', { _error: err.response.data.message })
      )
      dispatch(toggleProgressSignUp())
    })
}

export const sendSignInData = (data) => (dispatch) => {
  // FIXME refactor with async/await
  dispatch(toggleProgressSignIn())
  return API.sendSignInData(data)
    .then(({ data }) => {
      dispatch(toggleProgressSignIn())
      dispatch(setToken(data.token))
      localStorage.setItem('token', data.token)

      // dispatch(showSignInModal(false))
    })
    .catch((err) => {
      dispatch(resetSignInPassword())
      dispatch(stopSubmit('signIn', { _error: err.response.data.message }))
      dispatch(toggleProgressSignIn())
    })
}

// sendNewLink
export const validateEmail = (confirmationToken) => (dispatch) => {
  return API.sendConfirmationRequest(confirmationToken).then((res) => {
    if (res === 200) {
      dispatch(setToken(confirmationToken))
      localStorage.setItem('token', confirmationToken)
    }
  })
}

export const takeLinkData = () => (dispatch) => {
  // FIXME refactor with async/await
  return API.takeLinkData().then((res) => {
    dispatch(loadLinkData(res))
  })
}

export const sendNewLink = (data) => (dispatch) => {
  return API.sendNewLink(data).then(({ data }) => {})
}
