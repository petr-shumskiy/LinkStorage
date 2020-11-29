import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
import AppStart from './AppStart'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Confirmation from './Confirmation'

window.store = store

// FIXME change logic from show/unshow to routing (/login /register)
const appStart = (
  <Router>
    <Provider store={store}>
      <Route path='/' exact render={() => <AppStart />} />
      <Route
        path='/reg-confirmation/:confirmationToken'
        exact
        render={() => <Confirmation />}
      />
    </Provider>
  </Router>
)
/* const app = (
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
) */

ReactDOM.render(appStart, document.getElementById('root'))

serviceWorker.unregister()
