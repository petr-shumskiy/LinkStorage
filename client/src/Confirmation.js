import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { validateEmail } from './redux/userReducer'

const Confirmation = ({ token, validateEmail, match, history }) => {
  const { confirmationToken } = match.params
  useEffect(() => {
    validateEmail(confirmationToken)
  }, [token, confirmationToken, validateEmail])
  if (token) {
    history.push('/')
  }
  return (
    <div>
      <h1>{'Awaiting..'}</h1>
      {/* <button onClick={onButtonClick}>ok</button> */}
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

export default connect(mapStateToProps, {
  validateEmail
})(withRouter(Confirmation))
