import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setToken } from './redux/userReducer'

const Confirmation = ({ match, setToken, history }) => {
  setToken(match.params.token)
  const onButtonClick = () => history.push('/')
  return (
    <div>
      <h1>CONFIRMED</h1>
      <button onClick={onButtonClick}>ok</button>
    </div>
  )
}

export default connect(null, { setToken })(withRouter(Confirmation))
