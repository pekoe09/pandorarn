import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Modal, ModalForm } from '../common'
import { FormButtons } from '../common'
import { register, login } from '../../actions'

const Register = ({ isOpen, closeModal, error, register, login }) => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [psw, setPsw] = useState('')
  const [pswConfirmation, setPswConfirmation] = useState('')
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    psw: false,
    pswConfirmation: false
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors(validate())
  }, [touched])

  const handleSave = async (event) => {
    event.preventDefault()
    const userinfo = {
      firstName,
      lastName,
      email,
      psw
    }
    await register(userinfo)
    if (!error) {
      const credentials = {
        username: email,
        password: psw
      }
      await login(credentials)
      clearState()
      closeModal()
    }
  }

  const handleFirstNameChange = event => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = event => {
    setLastName(event.target.value)
  }

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }
  const handlePswChange = event => {
    setPsw(event.target.value)
  }

  const handlePswConfirmationChange = event => {
    setPswConfirmation(event.target.value)
  }

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
  }

  const clearState = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPsw('')
    setPswConfirmation('')
  }

  const handleCancel = () => {
    clearState()
    closeModal()
  }

  const handleEnter = () => { }

  const handleExit = () => {
    clearState()
  }

  const validate = () => {
    return {
      firstName: !firstName,
      lastName: !lastName,
      email: !email,
      psw: !psw,
      pswConfirmation: !psw
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
        <Modal.Title>Register for Pandora!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm>
          <ModalForm.Group controlId='firstName'>
            <ModalForm.Label>First name</ModalForm.Label>
            <ModalForm.Control
              type='text'
              name='firstName'
              value={firstName}
              onChange={handleFirstNameChange}
              onBlur={handleBlur}
              isInvalid={getValidationState(errors, 'firstName')}
            />
          </ModalForm.Group>
          <ModalForm.Group controlId='lastName'>
            <ModalForm.Label>Last name</ModalForm.Label>
            <ModalForm.Control
              type='text'
              name='lastName'
              value={lastName}
              onChange={handleLastNameChange}
              onBlur={handleBlur}
              isInvalid={getValidationState(errors, 'lastName')}
            />
          </ModalForm.Group>
          <ModalForm.Group controlId='email'>
            <ModalForm.Label>Email</ModalForm.Label>
            <ModalForm.Control
              type='text'
              name='email'
              value={email}
              onChange={handleEmailChange}
              onBlur={handleBlur}
              isInvalid={getValidationState(errors, 'email')}
            />
          </ModalForm.Group>
          <ModalForm.Group controlId='psw'>
            <ModalForm.Label>Password</ModalForm.Label>
            <ModalForm.Control
              type='text'
              name='psw'
              value={psw}
              onChange={handlePswChange}
              onBlur={handleBlur}
              isInvalid={getValidationState(errors, 'psw')}
            />
          </ModalForm.Group>
          <ModalForm.Group controlId='pswConfirmation'>
            <ModalForm.Label>Confirm password</ModalForm.Label>
            <ModalForm.Control
              type='text'
              name='pswConfirmation'
              value={pswConfirmation}
              onChange={handlePswConfirmationChange}
              onBlur={handleBlur}
              isInvalid={getValidationState(errors, 'pswConfirmation')}
            />
          </ModalForm.Group>
          <FormButtons
            handleSave={handleSave}
            handleCancel={handleCancel}
            saveIsDisabled={false}
          />
        </ModalForm>
      </Modal.Body>
    </Modal>
  )

}

const mapStateToProps = store => ({
  registering: store.users.registering,
  loggingIn: store.users.loggingIn,
  error: store.users.error
})

export default connect(
  mapStateToProps,
  {
    register,
    login
  }
)(Register)

Register.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  error: PropTypes.object,
  register: PropTypes.func.isRequired
}