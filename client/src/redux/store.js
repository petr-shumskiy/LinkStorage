import { applyMiddleware, combineReducers, createStore } from 'redux'
import { userReducer } from './userReducer'
import { reducer as form } from 'redux-form'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
const rootReducer = combineReducers({
  user: userReducer,
  form
})

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
  // composeWithDevTools(applyMiddleware(thunk))
)
