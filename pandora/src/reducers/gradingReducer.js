import {
  GRADING_CREATE_BEGIN,
  GRADING_CREATE_SUCCESS,
  GRADING_CREATE_FAILURE,
  GRADING_READ_BEGIN,
  GRADING_READ_SUCCESS,
  GRADING_READ_FAILURE,
  GRADING_UPDATE_BEGIN,
  GRADING_UPDATE_SUCCESS,
  GRADING_UPDATE_FAILURE,
  GRADING_DELETE_BEGIN,
  GRADING_DELETE_SUCCESS,
  GRADING_DELETE_FAILURE
} from '../actions'

const initialState = {
  items: [],
  gettingGradings: false,
  creatingGrading: false,
  updatingGrading: false,
  deletingGrading: false,
  gradingError: null
}

const gradingReducer = (store = initialState, action) => {
  switch (action.type) {
    case GRADING_CREATE_BEGIN:
      return {
        ...store,
        creatingGrading: true,
        gradingError: null
      }
    case GRADING_CREATE_SUCCESS:
      console.log('adding grading', action.payload.grading)
      return {
        ...store,
        items: store.items.concat(action.payload.grading),
        creatingGrading: false,
        gradingError: null
      }
    case GRADING_CREATE_FAILURE:
      return {
        ...store,
        creatingGrading: false,
        gradingError: action.payload.error
      }
    case GRADING_READ_BEGIN:
      return {
        ...store,
        gettingGradings: true,
        gradingError: false
      }
    case GRADING_READ_SUCCESS:
      return {
        ...store,
        items: action.payload.gradings,
        gettingGradings: false,
        gradingError: false
      }
    case GRADING_READ_FAILURE:
      return {
        ...store,
        gettingGradings: false,
        gradingError: action.payload.error
      }
    case GRADING_UPDATE_BEGIN:
      return {
        ...store,
        updatingGrading: true,
        gradingError: null
      }
    case GRADING_UPDATE_SUCCESS:
      return {
        ...store,
        items: store.items.map(c => c._id === action.payload.grading._id
          ? action.payload.grading : c),
        updatingGrading: false,
        gradingError: null
      }
    case GRADING_UPDATE_FAILURE:
      return {
        ...store,
        updatingGrading: false,
        gradingError: action.payload.error
      }
    case GRADING_DELETE_BEGIN:
      return {
        ...store,
        deletingGrading: true,
        gradingError: null
      }
    case GRADING_DELETE_SUCCESS:
      return {
        ...store,
        items: store.items.filter(c => c._id !== action.payload.gradingId),
        deletingGrading: false,
        gradingError: null
      }
    case GRADING_DELETE_FAILURE:
      return {
        ...store,
        deletingGrading: false,
        gradingError: action.payload.error
      }
    default:
      return store
  }
}

export default gradingReducer