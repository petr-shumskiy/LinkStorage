import AxiosError from 'axios-error'
import { Dispatch } from '@reduxjs/toolkit'
import { resetState, setError } from './userReducer'
import { logout } from './authReducer'

export function handleError(e: any, dispatch: Dispatch) {
  const error = new AxiosError(e)
  console.log(error)
  const { status } = error
  console.log(error.status)
  // newtwork error
  if (!status) {
    console.log(error)
    dispatch(setError({ name: 'network', isActve: true }))
  } else if (status === 404) {
    console.log(status, error)
  } else if (status === 403) {
    dispatch(logout())
    dispatch(resetState())
  } else if (status >= 500) {
    dispatch(setError({ name: 'server', isActve: true }))
  } else {
    dispatch(setError({ name: 'unknown', isActve: true }))
  }
}
