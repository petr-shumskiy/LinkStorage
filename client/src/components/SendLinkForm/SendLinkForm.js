/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import { Field, Form, reduxForm } from 'redux-form'
import { sendNewLink } from '../../redux/userReducer'
import { makeStyles, Button } from '@material-ui/core'

const formStyle = makeStyles((theme) => ({
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

const SendLinkForm = reduxForm({ form: 'addLink' })(({ handleSubmit }) => {
  const classes = formStyle()

  return (
    <Form onSubmit={handleSubmit} className={classes.grow}>
      <Field
        container='true'
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
  )
})

const sendLinkFormContainer = (props) => {
  const onSubmit = (formData) => {
    props.sendNewLink(formData)
  }
  return <SendLinkForm onSubmit={onSubmit} {...props} />
}

const mapStateToProps = ({ user }) => ({})

export default connect(mapStateToProps, { sendNewLink })(sendLinkFormContainer)
