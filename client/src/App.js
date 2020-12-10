import React from 'react'
import { useSelector } from 'react-redux'
import Main from './components/pages/Main/Main'
import Auth from './components/pages/Auth'
import { Route, Switch } from 'react-router-dom'
import Confirmation from './Confirmation'

const AppInit = () => {
  const token = useSelector(({ auth }) => auth.token)
  if (token) {
    return <Main />
  }
  return <Auth />
}

const App = () => {
  return (
    <Switch>
      <Route path='/' render={() => <AppInit />} />
      <Route path='/auth' exact render={() => <Auth />}></Route>
      <Route path='/reg-confirmation/:confirmationToken' exact render={() => <Confirmation />} />
    </Switch>
  )
}

// const dispatch = useDispatch()
export default App
