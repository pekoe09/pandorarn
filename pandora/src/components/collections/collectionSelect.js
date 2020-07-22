import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'
import { changeCollection } from '../../actions'

const getOptions = (collections, currentCollection) => {
  return collections.map(c => {
    if (currentCollection && c._id === currentCollection._id) {
      return <option value={c._id} key={c._id} selected>{c.name}</option>
    } else {
      return <option value={c._id} key={c._id}>{c.name}</option>
    }
  })
}

const CollectionSelect = ({ collections, currentCollection, changeCollection }) => {
  return (
    <Form inline>
      <Form.Group>
        <Form.Label>Collections</Form.Label>
        <Form.Control
          as='select'
          onChange={(e) => changeCollection(e.target.value)}
        >
          <option>Select collection</option>
          {collections && getOptions(collections, currentCollection)}
        </Form.Control>
      </Form.Group>
    </Form>
  )
}

export default connect(
  null,
  {
    changeCollection
  }
)(CollectionSelect)