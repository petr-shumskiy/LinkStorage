/* eslint-disable default-param-last */
import { API } from '../API/API'
import {
  LOGIN_USER,
  SHOW_SIGN_IN,
  SHOW_REGISTRATION,
  SET_TOKEN,
  LOG_OUT,
  LOAD_LINK_DATA,
  SET_LINK_TYPE
} from './types'

const initialState = {
  showRegistration: false,
  showSignIn: false,
  email: null,
  token: null,
  linksData: [],
  linkType: ''
}

export const userReducer = (state = initialState, { type, payload }) => {
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

export const loadLinkData = (linksData) => ({
  type: LOAD_LINK_DATA,
  payload: {
    linksData
  }
})

export const sendRegistrationData = (data) => (dispatch) => {
  // FIXME refactor with async/await
  return API.sendRegistrationData(data).then(() =>
    dispatch(showRegistrationModal(false))
  )
}

export const sendSignInData = (data) => (dispatch) => {
  // FIXME refactor with async/await
  return API.sendSignInData(data).then(({ data }) => {
    dispatch(setToken(data.token))
    localStorage.setItem('token', data.token)
    // dispatch(showSignInModal(false))
  })
}

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
