import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form } from '../common'
import { Button } from 'react-bootstrap'

const CustomFieldCreation = ({ existingField, collectionId, handleSave }) => {

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [touched, setTouched] = useState({
    name: false,
    type: false
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors(validate())
  }, [touched])

  useEffect(() => {
    if (existingField) {
      setId(existingField._id)
      setName(existingField.name)
      setType(existingField.type)
    } else {
      setType('text')
    }
  }, [])

  const attemptSave = (event) => {
    event.preventDefault()
    const fieldInfo = {
      id,
      name,
      type,
      collectionId
    }
    console.log('saving', fieldInfo)
    handleSave(fieldInfo)
    clearState()
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleTypeChange = event => {
    setType(event.target.value)
  }

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
  }

  const clearState = () => {
    setName('')
    setId('')
    setType('')
  }

  const validate = () => {
    return {
      name: !name,
      type: true
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
    <Form inline>
      <Form.Group controlId='name'>
        <Form.Control
          type='text'
          name='name'
          placeholder='Name for the field'
          value={name}
          onChange={handleNameChange}
          onBlur={handleBlur}
          isInvalid={getValidationState(errors, 'name')}
        />
      </Form.Group>
      <Form.Group controlId='type'>
        <Form.Control
          as='select'
          name='type'
          value={type}
          onChange={handleTypeChange}
          style={{ marginLeft: 5 }}
        >
          <option value='text'>Text</option>
          <option value='number'>Number</option>
          <option value='checkcbox'>Checkbox</option>
          <option value='date'>Date</option>
        </Form.Control>
      </Form.Group>
      <Button
        type='submit'
        onClick={attemptSave}
        style={{ marginLeft: 5 }}
      >
        Add
      </Button>
    </Form>
  )
}

export default CustomFieldCreation

CustomFieldCreation.propTypes = {
  existingField: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }),
  collectionId: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired
}
