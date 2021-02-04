import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './userReducer.ts'
import { authReducer } from './authReducer'
import { reducer as formReducer } from 'redux-form'
import { RESET_SIGN_IN_PASSWORD } from './types'

const form = formReducer.plugin({
  signIn: (state, { type, payload }) => {
    console.log('hello', type, payload, state)
    switch (type) {
      case RESET_SIGN_IN_PASSWORD: {
        return {
          ...state,
          values: { ...state.values, password: '' },
          fields: { ...state.fields, password: { touched: false } }
        }
      }
      default:
        return state
    }
  }
})

const rootReducer = combineReducers({
  auth: authReducer.reducer,
  user: userReducer.reducer,
  form
})

export const store = configureStore({
  reducer: rootReducer
})
