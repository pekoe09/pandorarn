import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { Modal, Form } from '../common'
import { FormButtons } from '../common'
import { saveCollection } from '../../actions'
import CustomFieldCreation from './customFieldCreation'
import CustomFieldItem from './customFieldItem'

const EditCollection = ({ isOpen, closeModal, error, collection, saveCollection, gradeTypes }) => {

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [gradeType, setGradeType] = useState([])
  const [customFields, setCustomFields] = useState([])
  const [touched, setTouched] = useState({
    name: false,
    description: false,
    gradeType: false
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors(validate())
  }, [touched])

  const handleSave = async (event) => {
    event.preventDefault()
    const collection = {
      _id: id,
      name,
      description,
      grading: gradeType.length > 0 ? gradeType[0]._id : null,
      customFields
    }
    await saveCollection(collection)
    if (!error) {
      clearState()
      closeModal()
    }
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleDescriptionChange = event => {
    setDescription(event.target.value)
  }

  const handleGradeTypeChange = event => {
    setGradeType(event.target.value)
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
    setName('')
    setDescription('')
    setId('')
    setGradeType('')
    setCustomFields([])
  }

  const handleCancel = () => {
    clearState()
    closeModal()
  }

  const handleEnter = () => {
    if (collection) {
      setId(collection._id)
      setName(collection.name)
      setDescription(collection.description)
      setGradeType(collection.grading ? [gradeTypes.find(g => g._id === collection.grading)] : [])
      setCustomFields(collection.customFields)
    }
  }

  const handleExit = () => {
    clearState()
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
    <Modal
      show={isOpen}
      onEnter={handleEnter}
      onShow={handleEnter}
      onExit={handleExit}
      onHide={closeModal}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add/edit collection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={name}
              onChange={handleNameChange}
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
              onChange={handleDescriptionChange}
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
        <FormButtons
          handleSave={handleSave}
          handleCancel={handleCancel}
          saveIsDisabled={Object.keys(errors).some(x => errors[x])}
        />
      </Modal.Body>
    </Modal>
  )
}

const mapStateToProps = store => ({
  gradeTypes: store.gradings.items
})

export default connect(
  mapStateToProps,
  {
    saveCollection
  }
)(EditCollection)

EditCollection.propTypes = {
  collection: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    gradeType: PropTypes.string
  }),
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  error: PropTypes.string,
  gradeTypes: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    abbreviation: PropTypes.string.isRequired
  })).isRequired
}