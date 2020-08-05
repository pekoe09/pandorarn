import React from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col } from 'react-bootstrap'

const gradingItemStyle = {
  color: 'black',
  backgroundColor: 'silver',
  padding: 15,
  marginTop: 10
}

const GradingItem = ({ grading, handleClick, handleDeleteRequest }) => {
  return (
    <div
      style={gradingItemStyle}
      onClick={() => handleClick(grading)}
    >
      <Row>
        <Col md={10}>
          <span>{grading.name}</span>
        </Col>
        <Col md={2}>
          <Button
            onClick={(e) => handleDeleteRequest(grading._id, e)}
            style={{ float: 'right' }}
          >
            Delete
      </Button>
        </Col>
      </Row>
    </div>
  )
}

export default GradingItem

GradingItem.propTypes = {
  grading: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    grades: [PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string.isRequired,
      abbreviation: PropTypes.string.isRequired,
      ordinality: PropTypes.number.isRequired
    })]
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDeleteRequest: PropTypes.func.isRequired
}