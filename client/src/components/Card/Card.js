/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'

const Card = ({ text }) => {
  return <h5>{text}</h5>
}
const mapStateToProps = ({ user }) => ({
  linksData: user.linksData
})

export default connect(mapStateToProps, {})(Card)
