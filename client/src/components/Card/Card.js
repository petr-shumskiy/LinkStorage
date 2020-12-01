/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'

const CreateAccount = ({
  linksData
}) => {
  return (
    <div>
      {linksData}
    </div>
  )
}
const mapStateToProps = ({ user }) => ({
  linksData: user.linksData
})

export default connect(mapStateToProps, {
})(CreateAccount)
