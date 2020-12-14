import React from 'react'
import { useSelector } from 'react-redux'
import Main from './AppPage/Main'
import Auth from './AuthPage/Auth'
import { Redirect, Route, Switch } from 'react-router-dom'
import Confirmation from './AuthPage/Confirmation'

const App = () => {
  const token = useSelector(({ auth }) => auth.token)
  console.log(token)
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
        render={() => (token ? <Redirect to='/' /> : <Auth />)}
      />
      <Route path='/home' exact render={() => <Main />} />
      <Route
        path='/'
        render={() => (token ? <Main /> : <Redirect to='/auth' />)}
      />
    </Switch>
  )
}

// const dispatch = useDispatch()
export default App
