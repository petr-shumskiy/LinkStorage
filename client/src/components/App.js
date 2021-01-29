import React from 'react'
import Main from './AppPage/AppPage'
import Auth from './AuthPage/Auth'
import { Redirect, Route, Switch } from 'react-router-dom'
import Confirmation from './AuthPage/Confirmation'
import { ThemeProvider } from '@material-ui/core'
import { theme } from '../theme'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const token = useSelector(({ auth }) => auth.token)

  return (
    <Switch>
      <Route
        path='/reg-confirmation/:confirmationToken'
        exact
        render={() => <Confirmation />}
      />
      <Route
        path='/auth'
        exact
        render={() => (token ? <Redirect to='/home' /> : <Auth />)}
      />
      <Route
        path='/home'
        exact
        render={() =>
          token ? (
            <ThemeProvider theme={theme}>
              <Main />
            </ThemeProvider>
          ) : (
            <Redirect to='/auth' />
          )
        }
      />
      <Route
        path='/'
        render={() =>
          token ? (
            <ThemeProvider theme={theme}>
              <Main />
            </ThemeProvider>
          ) : (
            <Redirect to='/auth' />
          )
        }
      />
    </Switch>
  )
}

export default App
