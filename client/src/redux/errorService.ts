import AxiosError from 'axios-error'
import { resetState, setError } from './userReducer'
import { logout } from './authReducer'

export function handleError(e: any, dispatch: any) {
  const error = new AxiosError(e)
  const { status } = error
  // newtwork error
  if (!status) {
    dispatch(setError({ name: 'network', isActve: true }))
  } else if (status === 403) {
    dispatch(logout())
    dispatch(resetState())
  } else if (status === 404) {
    console.log(status, error)
  } else if (status === 406) {
    dispatch(setError({ name: 'url', isActve: true }))
  } else if (status >= 500) {
    dispatch(setError({ name: 'server', isActve: true }))
  } else {
    dispatch(setError({ name: 'unknown', isActve: true }))
  }
}
