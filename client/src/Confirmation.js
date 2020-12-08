import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, withRouter } from 'react-router-dom'
import { validateEmail } from './redux/authReducer'

const Confirmation = () => {
  const history = useHistory()
  const { confirmationToken } = useParams()
  const token = useSelector(({ auth }) => auth.token)
  const validationError = useSelector(({ auth }) => auth.validationError)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(validateEmail(confirmationToken))
  }, [token, validationError, confirmationToken, dispatch])

  if (token) {
    history.push('/')
  }
  return (
    <div>
      <h1>{validationError || 'Awaiting..'}</h1>
      <button onClick={() => history.push('/')}>go home</button>
    </div>
  )
}

export default withRouter(Confirmation)
