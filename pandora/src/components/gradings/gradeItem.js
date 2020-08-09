import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const GradeItem = ({ name, abbreviation, ordinality, handleRemove }) => {
  return (
    <div
      style={{ color: 'black' }}
    >
      <span>{ordinality} </span>
      <span>{abbreviation} </span>
      <span>{name} </span>
      <Button
        onClick={(e) => handleRemove(name)}
      >
        Remove
      </Button>
    </div>
  )
}

export default GradeItem

GradeItem.propTypes = {
  name: PropTypes.string.isRequired,
  abbreviation: PropTypes.string.isRequired,
  ordinality: PropTypes.number.isRequired,
  handleRemove: PropTypes.func.isRequired
}