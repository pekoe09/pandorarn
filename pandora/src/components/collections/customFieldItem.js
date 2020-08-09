import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const CustomFieldItem = ({ name, type, handleRemove }) => {
  return (
    <div
      style={{ color: 'black' }}
    >
      <span>{name} </span>
      <span>{type}</span>
      <Button
        onClick={(e) => handleRemove(name)}
      >
        Remove
      </Button>
    </div>
  )
}

export default CustomFieldItem

CustomFieldItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired
}