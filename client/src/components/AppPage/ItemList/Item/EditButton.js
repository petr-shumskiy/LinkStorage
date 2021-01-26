import { createStyles, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { StyledButton } from './ItemActions/StyledButtons'

const useStyles = makeStyles((theme) =>
  createStyles({
    editButton: {
      position: 'absolute',
      top: -theme.spacing(1),
      right: 0,
      [theme.breakpoints.down('md')]: {
        top: -theme.spacing(2)
      }
    }
  })
)

export function EditButton({ isActive }) {
  const classes = useStyles()
  return (
    <StyledButton
      className={classes.editButton}
      style={{
        display: [isActive ? 'block' : 'none']
      }}
    >
      <Typography variant='body1' color='inherit'>
        edit
      </Typography>
    </StyledButton>
  )
}
