import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { Form, FormButtons } from '../common'
import CustomFieldCreation from './customFieldCreation'
import CustomFieldItem from './customFieldItem'
import CollectionContext from './collectionContext'

const EditCollection = ({
  collection,
  gradeTypes,
  error,
  history
}) => {
  const [id, setId] = useState(collection ? collection._id : '')
  const [name, setName] = useState(collection ? collection.name : '')
  const [description, setDescription] = useState(collection ? collection.description : '')
  const [gradeType, setGradeType] = useState((collection && collection.grading) ? [gradeTypes.find(g => g._id === collection.grading)] : [])
  const [customFields, setCustomFields] = useState(collection ? collection.customFields : [])
  const [touched, setTouched] = useState({
    name: false,
    description: false,
    gradeType: false
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors(validate())
  }, [touched])

  const getCollectionObject = (event) => {
    event.preventDefault()
    const collection = {
      _id: id,
      name,
      description,
      grading: gradeType.length > 0 ? gradeType[0]._id : null,
      customFields
    }
    return collection
  }

  const handleAddCustomField = newField => {
    const newFieldSet = [...customFields]
    newFieldSet.push(newField)
    setCustomFields(newFieldSet)
  }

  const handleRemoveCustomField = fieldName => {
    const newFieldSet = customFields.filter(f => f.name !== fieldName)
    setCustomFields(newFieldSet)
  }

  const getCustomFieldItems = () => {
    if (!customFields || customFields.length === 0) {
      return (
        <div
          style={{
            marginTop: 5,
            marginBottom: 5,
            color: 'darkgrey',
            fontStyle: 'italic'
          }}
        >
          <span>No custom fields added</span>
        </div>
      )
    } else {
      return customFields.map(f =>
        <CustomFieldItem
          name={f.name}
          type={f.type}
          handleRemove={handleRemoveCustomField}
        />)
    }
  }

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
  }

  const clearState = () => {
    setId('')
    setName('')
    setDescription('')
    setGradeType([])
    setCustomFields([])
  }

  const handleCancel = () => {
    clearState()
    history.push('/collections')
  }

  const validate = () => {
    return {
      name: !name,
      description: false,
      gradeType: false
    }
  }

  const getValidationState = (errors, field) => {
    if (errors[field] && touched[field]) {
      return 'error'
    } else {
      return null
    }
  }

  //const saveIsDisabled = Object.keys(errors).some(x => errors[x])

  return (
    <div style={{ padding: 10 }}>
      <h2>Add/edit collection</h2>
      <Form>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={handleBlur}
            isInvalid={getValidationState(errors, 'name')}
          />
        </Form.Group>
        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            name='description'
            value={description || ''}
            onChange={e => setDescription(e.target.value)}
            onBlur={handleBlur}
            isInvalid={getValidationState(errors, 'description')}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Grading used</Form.Label>
          <Typeahead
            onChange={(selected) => { setGradeType(selected) }}
            options={gradeTypes}
            selected={gradeType}
            labelKey='name'
            id='_id'
            maxResults={10}
          />
        </Form.Group>
        <Form.Label>Custom fields</Form.Label>
      </Form>

      <CustomFieldCreation
        collectionId={id}
        handleSave={handleAddCustomField}
      />
      {customFields && getCustomFieldItems()}
      <CollectionContext.Consumer>
        {value => (
          <FormButtons
            handleSave={event => { value.handleSaveCollection(getCollectionObject(event)) }}
            handleCancel={handleCancel}
            saveIsDisabled={Object.keys(errors).some(x => errors[x])}
          />
        )}
      </CollectionContext.Consumer>
    </div>
  )
}

const mapStateToProps = store => ({
  gradeTypes: store.gradings.items,
  error: store.collections.error
})

export default withRouter(connect(
  mapStateToProps,
  {}
)(EditCollection))

EditCollection.propTypes = {
  collection: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    gradeType: PropTypes.string
  }),
  error: PropTypes.string,
  gradeTypes: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    abbreviation: PropTypes.string.isRequired
  })).isRequired
}