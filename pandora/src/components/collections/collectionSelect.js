import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { Form } from 'react-bootstrap'
import { changeCollection } from '../../actions'

const CollectionSelect = ({ collections, currentCollection, changeCollection, history }) => {

  const handleChange = (selected) => {
    changeCollection(selected.length > 0 ? selected[0]._id : '')
    history.push('/collections')
  }

  const selectedCollection = currentCollection ? [currentCollection] : []

  return (
    <Form inline>
      <Form.Group>
        <Form.Label>Collections</Form.Label>
        <Typeahead
          onChange={selected => handleChange(selected)}
          options={collections}
          selected={selectedCollection}
          labelKey='name'
          id='_id'
          maxResults={10}
          placeholder={collections.length > 0 ? 'Select a collection' : 'No collections'}
        />
      </Form.Group>
    </Form>
  )
}

export default withRouter(connect(
  null,
  {
    changeCollection
  }
)(CollectionSelect))