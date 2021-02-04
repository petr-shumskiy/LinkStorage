import React from 'react'
import Main from './AppPage/AppPage'
import Auth from './AuthPage/Auth'
import { Redirect, Route, Switch } from 'react-router-dom'
import Confirmation from './AuthPage/Confirmation'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { checkErrors, getTheme, resetErrors } from '../redux/userReducer'
import { Box, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { createTheme } from '../theme'

const App = () => {
  const token = useSelector(({ auth }) => auth.token)
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [hasError, errorMessage] = useSelector(checkErrors)
  const theme = useSelector(getTheme)

  // Error handling
  if (hasError) {
    enqueueSnackbar(errorMessage, {
      variant: 'error',
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'top'
      },
      preventDuplicate: true
    })
    //
    dispatch(resetErrors())
  }

  return (
    <ThemeProvider theme={createMuiTheme(createTheme(theme))}>
      <Box
        minWidth={420}
        minHeight='100vh'
        height='100%'
        style={{ backgroundColor: theme === 'dark' ? '#212121' : '#ffffff' }}
      >
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
            render={() => (token ? <Main /> : <Redirect to='/auth' />)}
          />
          <Route path='/' render={() => (token ? <Main /> : <Redirect to='/auth' />)} />
        </Switch>
      </Box>
    </ThemeProvider>
  )
}

export default App
