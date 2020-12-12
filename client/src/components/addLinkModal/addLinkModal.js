/* eslint-disable react/prop-types */
import React from 'react'
import { makeStyles, Divider, Button } from '@material-ui/core'
// import SendLinkForm from './../SendLinkForm/SendLinkForm'
import { Field, Form, reduxForm } from 'redux-form'
import { useDispatch } from 'react-redux'
import { addItemThunk } from '../../redux/userReducer'

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
  },
  grow: {
    flexGrow: 1,
    paddingTop: '24px'
  },
  input: {
    width: 'calc(100% - 70px)',
    padding: '8px',
    marginRight: '5px'
  }
}))

const AddLinkModal = ({ handleSubmit }) => {
  const classes = useModalStyles()
  return (
    <div className={classes.paper}>
      <h3 id='simple-modal-title'>Add Link</h3>
      <Divider />
      <Form onSubmit={handleSubmit} className={classes.grow}>
        <Field
          container='true'
          autoFocus
          className={classes.input}
          spacing={2}
          component='input'
          type='text'
          id='url'
          name='url'
          placeholder='www.example.com/index.html'
        />
        <Button color='primary' type='submit'>
          Add
        </Button>
      </Form>
    </div>
  )
}

const AddLinkModalReduxForm = reduxForm({ form: 'addLink' })(AddLinkModal)

const AddLinkModalContainer = (props) => {
  const dispatch = useDispatch()

  const submitHandler = (formData) => {
    dispatch(addItemThunk(formData))
  }

  return <AddLinkModalReduxForm onSubmit={submitHandler} {...props} />
}
export default AddLinkModalContainer
