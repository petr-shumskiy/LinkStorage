import React from 'react'
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core'

export const StyledEmailField = ({ input, meta, ...props }) => {
  const { touched, invalid } = meta
  const shouldShowError = touched && invalid
  return (
    <TextField
      variant='outlined'
      margin='normal'
      required
      fullWidth
      id='email'
      label='Email Address'
      name='email'
      autoComplete='email'
      autoFocus
      helperText={shouldShowError ? 'must be valid email' : ''}
      onChange={input.onChange}
      value={input.value}
      error={shouldShowError}
    />
  )
}

export const StyledPassField = ({ input, meta }) => {
  const { touched, invalid } = meta
  const shouldShowError = touched && invalid
  return (
    <TextField
      variant='outlined'
      margin='normal'
      required
      fullWidth
      name='password'
      label='Password'
      type='password'
      id='password'
      autoComplete='current-password'
      helperText={
        shouldShowError ? 'At least 6 symbols, 1 Uppercase or digit' : ''
      }
      onChange={input.onChange}
      value={input.value}
      error={shouldShowError}
    />
  )
}

export const RememberMe = () => {
  return (
    <FormControlLabel
      control={<Checkbox value='remember' color='primary' />}
      label='Remember me'
    />
  )
}
