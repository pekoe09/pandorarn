import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../services'

export const GRADING_CREATE_BEGIN = 'GRADING_CREATE_BEGIN'
export const GRADING_CREATE_SUCCESS = 'GRADING_CREATE_SUCCESS'
export const GRADING_CREATE_FAILURE = 'GRADING_CREATE_FAILURE'
export const GRADING_READ_BEGIN = 'GRADING_READ_BEGIN'
export const GRADING_READ_SUCCESS = 'COLLETION_READ_SUCCESS'
export const GRADING_READ_FAILURE = 'GRADING_READ_FAILURE'
export const GRADING_UPDATE_BEGIN = 'GRADING_UPDATE_BEGIN'
export const GRADING_UPDATE_SUCCESS = 'GRADING_UPDATE_SUCCESS'
export const GRADING_UPDATE_FAILURE = 'GRADING_UPDATE_FAILURE'
export const GRADING_DELETE_BEGIN = 'GRADING_DELETE_BEGIN'
export const GRADING_DELETE_SUCCESS = 'GRADING_DELETE_SUCCESS'
export const GRADING_DELETE_FAILURE = 'GRADING_DELETE_FAILURE'

export const createGradingBegin = () => ({
  type: GRADING_CREATE_BEGIN
})

export const createGradingSuccess = grading => ({
  type: GRADING_CREATE_SUCCESS,
  payload: { grading }
})

export const createGradingFailure = error => ({
  type: GRADING_CREATE_FAILURE,
  payload: { error }
})

export const getGradingsBegin = () => ({
  type: GRADING_READ_BEGIN
})

export const getGradingsSuccess = gradings => ({
  type: GRADING_READ_SUCCESS,
  payload: { gradings }
})

export const getGradingsFailure = error => ({
  type: GRADING_READ_FAILURE,
  payload: { error }
})

export const updateGradingBegin = () => ({
  type: GRADING_UPDATE_BEGIN
})

export const updateGradingSuccess = grading => ({
  type: GRADING_UPDATE_SUCCESS,
  payload: { grading }
})

export const updateGradingFailure = error => ({
  type: GRADING_UPDATE_FAILURE,
  payload: { error }
})

export const gradingDeleteBegin = () => ({
  type: GRADING_DELETE_BEGIN
})

export const gradingDeleteSuccess = gradingId => ({
  type: GRADING_DELETE_SUCCESS,
  payload: { gradingId }
})

export const gradingDeleteFailure = error => ({
  type: GRADING_DELETE_FAILURE,
  payload: { error }
})

export const getGradings = () => {
  console.log('getting gradings')
  return async (dispatch) => {
    dispatch(getGradingsBegin())
    try {
      const gradings = await getAll('gradings')
      dispatch(getGradingsSuccess(gradings))
    } catch (exception) {
      console.log(exception)
      dispatch(getGradingsFailure(exception))
    }
  }
}

export const saveGrading = grading => {
  return async (dispatch) => {
    if (grading._id) {
      dispatch(updateGradingBegin())
      try {
        grading = await updateEntity('gradings', grading)
        dispatch(updateGradingSuccess(grading))
      } catch (exception) {
        dispatch(updateGradingFailure(exception))
      }
    } else {
      dispatch(createGradingBegin())
      try {
        grading = await addEntity('gradings', grading)
        dispatch(createGradingSuccess(grading))
      } catch (exception) {
        dispatch(createGradingFailure(exception))
      }
    }
  }
}

export const deleteGrading = gradingId => {
  return async (dispatch) => {
    dispatch(gradingDeleteBegin())
    try {
      await removeEntity('gradings', gradingId)
      dispatch(gradingDeleteSuccess(gradingId))
    } catch (exception) {
      dispatch(gradingDeleteFailure(exception))
    }
  }
}