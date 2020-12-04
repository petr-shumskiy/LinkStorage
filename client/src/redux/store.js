import { applyMiddleware, combineReducers, createStore } from 'redux'
import { userReducer } from './userReducer'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { RESET_SIGN_IN_PASSWORD } from './types'

const form = formReducer.plugin({
  signIn: (state, { type, payload }) => {
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
  user: userReducer,
  form
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
