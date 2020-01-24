import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Modal, Form } from '../common'
import { FormButtons } from '../common'
import { saveCollection } from '../../actions'

const EditCollection = ({ isOpen, closeModal, error, collection }) => {

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [touched, setTouched] = useState({ name: false })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors(validate())
  }, [touched])

  const handleSave = async (event) => {
    event.preventDefault()
    const collection = {
      id,
      name
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

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
  }

  const clearState = () => {
    setName('')
    setId('')
  }

  const handleCancel = () => {
    clearState()
    closeModal()
  }

  const handleEnter = () => {
    if (collection) {
      setId(collection.id)
      setName(collection.name)
    }
  }

  const handleExit = () => {
    clearState()
  }

  const validate = () => {
    return {
      name: !name
    }
  }

  const getValidationState = (errors, field) => {
    if (errors[field] && touched[field]) {
      return 'error'
    } else {
      return null
    }
  }

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
        </Form>
        <FormButtons
          handleSave={handleSave}
          handleCancel={handleCancel}
          saveIsDisabled={false}
        />
      </Modal.Body>
    </Modal>
  )
}

export default connect(
  null,
  {
    saveCollection
  }
)(EditCollection)

EditCollection.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  error: PropTypes.string
}