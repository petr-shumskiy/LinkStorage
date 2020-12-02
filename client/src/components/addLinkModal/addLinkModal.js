/* eslint-disable react/prop-types */
import React from 'react'
import { makeStyles, Divider } from '@material-ui/core'
import SendLinkForm from './../SendLinkForm/SendLinkForm'

const useModalStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

const addLinkModal = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useModalStyles()
  return (
      <div className={classes.paper}>
        <h3 id="simple-modal-title">Add Link</h3>
        <Divider />
        <SendLinkForm />
      </div>
  )
}
export default addLinkModal
