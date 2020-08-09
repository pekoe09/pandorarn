import React from 'react'
import PropTypes from 'prop-types'

const AdminContainer = (props) => {

  return (
    <div
      className='admin-container'
      style={{
        padding: '10px',
        width: '100%'
      }}
    >
      {props.children}
    </div>
  )
}

export default AdminContainer

AdminContainer.propTypes = {}