import { SEND_USER } from './types'

export function sendUser() {
  return async (dispatch) => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=5'
    )
    const json = await response.json()
    dispatch({ type: SEND_USER, payLoad: json })
  }
}
