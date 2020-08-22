import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, FormButtons } from '../common'
import { CategoryContext } from './index'

const EditCategory = ({
  category,
  collectionId,
  error,
  history
}) => {

  const [id, setId] = useState(category ? category._id : '')
  const [name, setName] = useState(category ? category.name : '')
  const [touched, setTouched] = useState({ name: false })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors(validate())
  }, [touched])

  const getCategoryObject = (event) => {
    event.preventDefault()
    const category = {
      id,
      name,
      collectionId
    }
    return category
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
    history.push('/collections')
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
    <div style={{ padding: 10 }}>
      <h2>Add/edit category</h2>
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
      </Form>
      <CategoryContext.Consumer>
        {value => (
          <FormButtons
            handleSave={value.handleSaveCategory}
            getSaveTarget={getCategoryObject}
            handleCancel={handleCancel}
            saveIsDisabled={Object.keys(errors).some(x => errors[x])}
          />
        )}
      </CategoryContext.Consumer>
    </div>
  )

}

const mapStateToProps = (store, ownProps) => {
  const category = store.categories.byId[ownProps.match.params.id]
  return {
    category,
    error: store.categories.categoryError
  }
}

export default withRouter(connect(
  mapStateToProps,
  {}
)(EditCategory))

EditCategory.propTypes = {
  collectionId: PropTypes.string.isRequired
}