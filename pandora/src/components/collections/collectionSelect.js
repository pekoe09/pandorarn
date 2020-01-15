import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'
import { changeCollection } from '../../actions'

const getOptions = (collections) => {
  return collections.map(c => <option value={c.id} key={c.id}>{c.name}</option>)
}

const CollectionSelect = ({ collections, isInline, changeCollection }) => {
  return (
    <Form inline>
      <Form.Group>
        <Form.Label>Collections</Form.Label>
        <Form.Control
          as='select'
          onChange={(e) => changeCollection(e.target.value)}
        >
          <option>Select collection</option>
          {collections && getOptions(collections)}
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