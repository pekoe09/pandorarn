import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form } from '../common'
import { Button } from 'react-bootstrap'

const GradeCreation = ({ existingGrade, handleSave, error }) => {

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [abbreviation, setAbbreviation] = useState('')
  const [ordinality, setOrdinality] = useState(0)
  const [touched, setTouched] = useState({
    name: false,
    abbreviation: false,
    ordinality: false
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors(validate())
  }, [touched])

  useEffect(() => {
    if (existingGrade) {
      setId(existingGrade._id)
      setName(existingGrade.name)
      setAbbreviation(existingGrade.abbreviation)
      setOrdinality(existingGrade.ordinality)
    }
  }, [])

  const attemptSave = (event) => {
    event.preventDefault()
    const gradeInfo = {
      id,
      name,
      abbreviation,
      ordinality
    }
    console.log('saving', gradeInfo)
    handleSave(gradeInfo)
    if (!error) {
      clearState()
    } else {
      setErrors({
        name: true
      })
    }
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleAbbreviationChange = event => {
    setAbbreviation(event.target.value)
  }

  const handleOrdinalityChange = event => {
    setOrdinality(event.target.value)
  }

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
  }

  const clearState = () => {
    setId('')
    setName('')
    setAbbreviation('')
    setOrdinality(0)
  }

  const validate = () => {
    return {
      name: !name,
      abbreviation: !abbreviation,
      ordinality: ordinality < 1
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
          placeholder='Name for the grade'
          value={name}
          onChange={handleNameChange}
          onBlur={handleBlur}
          isInvalid={getValidationState(errors, 'name')}
        />
      </Form.Group>
      <Form.Group controlId='abbreviation'>
        <Form.Control
          type='text'
          name='abbreviation'
          placeholder='Abbreviation for the grade'
          value={abbreviation}
          onChange={handleAbbreviationChange}
          onBlur={handleBlur}
          isInvalid={getValidationState(errors, 'abbreviation')}
        />
      </Form.Group>
      <Form.Group controlId='ordinality'>
        <Form.Control
          type='number'
          name='ordinality'
          value={ordinality}
          onChange={handleOrdinalityChange}
          onBlur={handleBlur}
          isInvalid={getValidationState(errors, 'ordinality')}
        />
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

export default GradeCreation

GradeCreation.propTypes = {
  existingGrade: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    abbreviation: PropTypes.string.isRequired,
    ordinality: PropTypes.number.isRequired
  }),
  handleSave: PropTypes.func.isRequired,
  error: PropTypes.string
}
