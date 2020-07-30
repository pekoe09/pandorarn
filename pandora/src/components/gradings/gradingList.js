import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import GradingItem from './gradingItem'

const getGradingItems = (
  gradings,
  handleClick,
  handleAdd,
  handleDeleteRequest
) => {
  if (!gradings || gradings.length === 0) {
    return (
      <div>No grading systems found.</div>
    )
  } else {
    return gradings.map(g =>
      <GradingItem
        grading={g}
        handleClick={handleClick}
        handleDeleteRequest={handleDeleteRequest}
      />
    )
  }
}

const GradingList = ({ gradings, handleClick, handleAdd, handleDeleteRequest }) => {
  return (
    <>
      <div style={{ fontSize: '2em', width: '100%' }}>
        <span>Grading systems for items</span>
        <Button
          style={{ float: 'right' }}
          onClick={handleAdd}
        >
          New grading
        </Button>
      </div>
      {getGradingItems(gradings, handleClick, handleDeleteRequest)}
    </>
  )
}

export default GradingList

GradingList.propTypes = {
  gradings: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      grades: [PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string.isRequired,
        abbreviation: PropTypes.string.isRequired,
        ordinality: PropTypes.number.isRequired
      })]
    })
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleDeleteRequest: PropTypes.func.isRequired
}