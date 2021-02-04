import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { SnackbarProvider } from 'notistack'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister()
