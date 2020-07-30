import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  getGradings,
  saveGrading,
  deleteGrading
} from '../../actions'
import GradingList from './gradingList'
import EditGrating from './editGrading'

const GradingContainer = ({
  gradings,
  gettingGradings,
  creatingGrading,
  updatingGrading,
  deletingGrading,
  error,
  getGradings,
  saveGrading,
  deleteGrading
}) => {

  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [itemToEdit, setItemToEdit] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [modalError, setModalError] = useState(null)

  const toggleEditModal = () => {
    setEditModalIsOpen(!editModalIsOpen)
    setItemToEdit(null)
    setModalError(null)
  }

  const handleSave = async grading => {
    console.log('saving grading', grading)
  }

  const handleDeleteRequest = (grading, e) => {

  }

  const handleDeleteConfirmation = async isConfirmed => {

  }

  return (
    <>
      <GradingList
        gradings={gradings}
        handleClick={toggleEditModal}
        handleAdd={toggleEditModal}
        handleDeleteRequest={handleDeleteRequest}
      />

      <EditGrating
        isOpen={editModalIsOpen}
        closeModal={toggleEditModal}
        error={modalError}
        grading={itemToEdit}
        handleSave={handleSave}
      />
    </>
  )

}

const mapStateToProps = store => ({
  gradings: store.gradings.items,
  gettingGradings: store.gradings.gettingGradings,
  creatingGrading: store.gradings.creatingGrading,
  updatingGrading: store.gradings.updatingGrading,
  deletingGrading: store.gradings.deletingGrading,
  error: store.gradings.gradingError
})

export default connect(
  mapStateToProps,
  {
    getGradings,
    saveGrading,
    deleteGrading
  }
)(GradingContainer)

GradingContainer.propTypes = {
  gradings: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired,
  gettingGradings: PropTypes.bool.isRequired,
  creatingGrading: PropTypes.bool.isRequired,
  updatingGrading: PropTypes.bool.isRequired,
  deleteGrading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  getGradings: PropTypes.func.isRequired,
  saveGrading: PropTypes.func.isRequired,
  deleteGrading: PropTypes.func.isRequired
}