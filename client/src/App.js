import React from 'react'
import { useSelector } from 'react-redux'
import Main from './components/pages/Main/Main'
import Auth from './components/pages/Auth'
import { Route } from 'react-router-dom'
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
    <>
      <Route path='/' exact render={() => <AppInit />} />
      <Route path='/reg-confirmation/:confirmationToken' exact render={() => <Confirmation />} />
    </>
  )
}

// const dispatch = useDispatch()
export default App
