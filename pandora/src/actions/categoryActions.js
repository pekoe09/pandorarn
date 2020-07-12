import {
  addEntity,
  updateEntity
} from '../services'

export const CATEGORY_CREATE_BEGIN = 'CATEGORY_CREATE_BEGIN'
export const CATEGORY_CREATE_SUCCESS = 'CATGEGORY_CREATE_SUCCESS'
export const CATEGORY_CREATE_FAILURE = 'CATEGORY_CREATE_FAILURE'
export const CATEGORY_UPDATE_BEGIN = 'CATEGORY_UPDATE_BEGIN'
export const CATEGORY_UPDATE_SUCCESS = 'CATEGORY_UPDATE_SUCCESS'
export const CATEGORY_UPDATE_FAILURE = 'CATEGORY_UPDATE_FAILURE'

export const createCategoryBegin = () => ({
  type: CATEGORY_CREATE_BEGIN
})

export const createCategorySuccess = category => ({
  type: CATEGORY_CREATE_SUCCESS,
  payload: { category }
})

export const createCategoryFailure = error => ({
  type: CATEGORY_CREATE_FAILURE,
  payload: { error }
})

export const updateCategoryBegin = () => ({
  type: CATEGORY_UPDATE_BEGIN
})

export const updateCategorySuccess = category => ({
  type: CATEGORY_UPDATE_SUCCESS,
  payload: { category }
})

export const updateCategoryFailure = error => ({
  type: CATEGORY_UPDATE_FAILURE,
  payload: { error }
})


export const saveCategory = category => {
  console.log('action to save', category)
  return async (dispatch) => {
    if (category.id) {
      dispatch(updateCategoryBegin())
      try {
        dispatch(updateCategorySuccess(category))
      } catch (exception) {
        console.log('error when updating category', exception)
        dispatch(updateCategoryFailure(exception))
      }
    } else {
      dispatch(createCategoryBegin())
      try {
        dispatch(createCategorySuccess(category))
      } catch (exception) {
        console.log('error when creating category', exception)
      }
    }
  }
}