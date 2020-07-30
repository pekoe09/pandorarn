import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Modal, Form, FormButtons } from '../common'
import { saveGrading, getGradings } from '../../actions'
import GradeItem from './gradeItem'
import GradeCreation from './gradeCreation'

const EditGrading = ({
  isOpen,
  closeModal,
  error,
  grading,
  handleSave
}) => {

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [grades, setGrades] = useState([])
  const [touched, setTouched] = useState({
    name: false,
    description: false
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors(validate())
  }, [touched])

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleDescriptionChange = event => {
    setDescription(event.target.value)
  }

  const handleAddGrade = newGrade => {
    let newGrades = [...grades]
    newGrades.push(newGrade)
    newGrades = newGrades.sort((a, b) => (a.ordinality > b.ordinality) ? 1 : -1)
    console.log('sorted', newGrades)
    setGrades(newGrades)
  }

  const handleRemoveGrade = gradeName => {
    const newGrades = grades.filter(g => g.name !== gradeName)
    setGrades(newGrades)
  }

  const getGrades = () => {
    if (!grades || grades.length === 0) {
      return (
        <div
          style={{
            marginTop: 5,
            marginBottom: 5,
            color: 'darkgrey',
            fontStyle: 'italic'
          }}
        >
          <span>No grades added</span>
        </div>
      )
    } else {
      return grades.map(g =>
        <GradeItem
          name={g.name}
          abbreviation={g.abbreviation}
          ordinality={g.ordinality}
          handleRemove={handleRemoveGrade}
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
    setGrades([])
  }

  const handleCancel = () => {
    clearState()
    closeModal()
  }

  const handleEnter = () => {
    if (grading) {
      setId(grading._id)
      setName(grading.name)
      setDescription(grading.description)
      setGrades(grading.grades)
    }
  }

  const handleExit = () => {
    clearState()
  }

  const validate = () => {
    return {
      name: !name,
      description: false
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
        <Modal.Title>Add/edit grading</Modal.Title>
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
              value={description}
              onChange={handleDescriptionChange}
              onBlur={handleBlur}
              isInvalid={getValidationState(errors, 'description')}
            />
          </Form.Group>
          <Form.Label>Grades</Form.Label>
        </Form>

        <GradeCreation
          handleSave={handleAddGrade}
        />
        {grades && getGrades()}
        <FormButtons
          handleSave={handleSave}
          handleCancel={handleCancel}
          saveIsDisabled={Object.keys(errors).some(x => errors[x])}
        />
      </Modal.Body>
    </Modal>
  )

}

export default connect(
  null,
  {
    saveGrading
  }
)(EditGrading)

EditGrading.propTypes = {
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
  }),
  handleSave: PropTypes.func.isRequired
}