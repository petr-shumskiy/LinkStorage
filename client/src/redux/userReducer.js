/* eslint-disable default-param-last */
import { LOGIN_USER } from './types'

const initialState = {
  user: []
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    /* case CREATE_POST:
      console.log(action.payLoad)
      return { ...state, posts: state.posts.concat([action.payLoad]) }
    case FETCH_POST:
      return { ...state, fetchedPosts: action.payLoad } */
    case LOGIN_USER:
      return { ...state, user: action.payLoad }
    default:
      return state
  }
}
