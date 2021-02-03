import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ThemeProvider } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'
import { theme } from './theme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <SnackbarProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </SnackbarProvider>
  </ThemeProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
