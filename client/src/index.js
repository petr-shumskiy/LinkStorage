import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
import AppStart from './AppStart'
import * as serviceWorker from './serviceWorker'
// import { BrowserRouter as Router } from 'react-router-dom'
import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import { rootReducer } from './redux/rootReducer'
import { Provider } from 'react-redux'

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
const appStart = (
  <Provider store={store}>
    <AppStart />
  </Provider>
)
/* const app = (
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
) */

ReactDOM.render(
  appStart,
  document.getElementById('root')
)

serviceWorker.unregister()
