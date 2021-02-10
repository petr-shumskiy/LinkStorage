import { Box, CircularProgress, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams, withRouter } from 'react-router-dom'
import { getError, getToken, validateEmail } from '../../redux/authReducer'

const Confirmation = () => {
  const { confirmationToken } = useParams()
  const token = useSelector(getToken)
  const validationError = useSelector(getError)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(validateEmail(confirmationToken))
  }, [token, validationError, confirmationToken, dispatch])

  if (token) {
    return <Redirect to='/' />
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
      {validationError ? (
        <Typography variant='h1' color='error'>
          {validationError}
        </Typography>
      ) : (
        <CircularProgress />
      )}
    </Box>
  )
}

export default withRouter(Confirmation)
