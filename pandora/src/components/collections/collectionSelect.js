import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { Form } from 'react-bootstrap'
import { changeCollection } from '../../actions'

// const getOptions = (collections) => {
//   console.log('generating options for', collections)
//   const options = collections.map(c => { return (<option value={c._id} key={c._id}>{c.name}</option>) })
//   // return collections.map(c => {
//   //   return <option value={c._id} key={c._id}>{c.name}</option>
//   //   // if (currentCollection && c._id === currentCollection._id) {
//   //   //   return <option value={c._id} key={c._id} selected>{c.name}</option>
//   //   // } else {
//   //   //   return <option value={c._id} key={c._id}>{c.name}</option>
//   //   // }
//   // })
//   console.log('generated', options)
//   return options
// }

const CollectionSelect = ({ collections, currentCollection, changeCollection }) => {
  //console.log('getting collections for select', collections)

  // const [selectedCollection, setSelectedCollection] = useState([])
  const selectedCollection = currentCollection ? [currentCollection] : []

  // const handleChangeCollection = (selected) => {
  //   setSelectedCollection(selected)
  //   changeCollection(selected)
  // }

  return (
    <Form inline>
      <Form.Group>
        <Form.Label>Collections</Form.Label>
        <Typeahead
          onChange={(selected) => changeCollection(selected.length > 0 ? selected[0]._id : '')}
          options={collections}
          selected={selectedCollection}
          labelKey='name'
          id='_id'
          maxResults={10}
        />
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