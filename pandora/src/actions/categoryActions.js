import {
  addEntity,
  getAll,
  updateEntity,
  removeEntity
} from '../services'

export const CATEGORY_CREATE_BEGIN = 'CATEGORY_CREATE_BEGIN'
export const CATEGORY_CREATE_SUCCESS = 'CATGEGORY_CREATE_SUCCESS'
export const CATEGORY_CREATE_FAILURE = 'CATEGORY_CREATE_FAILURE'
export const CATEGORY_READ_BEGIN = 'CATEGORY_READ_BEGIN'
export const CATEGORY_READ_SUCCESS = 'CATEGORY_READ_SUCCESS'
export const CATEGORY_READ_FAILURE = 'CATEGORY_READ_FAILURE'
export const CATEGORY_UPDATE_BEGIN = 'CATEGORY_UPDATE_BEGIN'
export const CATEGORY_UPDATE_SUCCESS = 'CATEGORY_UPDATE_SUCCESS'
export const CATEGORY_UPDATE_FAILURE = 'CATEGORY_UPDATE_FAILURE'
export const CATEGORY_DELETE_BEGIN = 'CATEGORY_DELETE_BEGIN'
export const CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS'
export const CATEGORY_DELETE_FAILURE = 'CATEGORY_DELETE_FAILURE'

export const createCategoryBegin = () => ({
  type: CATEGORY_CREATE_BEGIN
})

export const createCategorySuccess = (category, collectionId) => ({
  type: CATEGORY_CREATE_SUCCESS,
  payload: { category, collectionId }
})

export const createCategoryFailure = error => ({
  type: CATEGORY_CREATE_FAILURE,
  payload: { error }
})

export const getCategoriesBegin = () => ({
  type: CATEGORY_READ_BEGIN
})

export const getCategoriesSuccess = categories => {
  console.log('getCategoriesSuccess called')
  return {
    type: CATEGORY_READ_SUCCESS,
    payload: { categories }
  }
}

export const getCategoriesFailure = error => ({
  type: CATEGORY_READ_FAILURE,
  payload: { error }
})

export const updateCategoryBegin = () => ({
  type: CATEGORY_UPDATE_BEGIN
})

export const updateCategorySuccess = (category, collectionId) => ({
  type: CATEGORY_UPDATE_SUCCESS,
  payload: { category, collectionId }
})

export const updateCategoryFailure = error => ({
  type: CATEGORY_UPDATE_FAILURE,
  payload: { error }
})

export const categoryDeleteBegin = () => ({
  type: CATEGORY_DELETE_BEGIN
})

export const categoryDeleteSuccess = (categoryId, collectionId) => ({
  type: CATEGORY_DELETE_SUCCESS,
  payload: { categoryId, collectionId }
})

export const categoryDeleteFailure = error => ({
  type: CATEGORY_DELETE_FAILURE,
  payload: { error }
})

export const getCategories = () => {
  return async (dispatch) => {
    dispatch(getCategoriesBegin())
    try {
      const categories = await getAll('categories')
      dispatch(getCategoriesSuccess(categories))
    } catch (exception) {
      console.log(exception)
      dispatch(getCategoriesFailure(exception))
    }
  }
}

export const saveCategory = categoryObject => {
  console.log('action to save', categoryObject)
  let { collectionId, ...category } = categoryObject
  return async (dispatch) => {
    if (category.id) {
      dispatch(updateCategoryBegin())
      try {
        category = await updateEntity('categories', categoryObject)
        dispatch(updateCategorySuccess(category, collectionId))
      } catch (exception) {
        console.log('error when updating category', exception)
        dispatch(updateCategoryFailure(exception))
      }
    } else {
      dispatch(createCategoryBegin())
      try {
        category = await addEntity('categories', categoryObject)
        dispatch(createCategorySuccess(category, collectionId))
      } catch (exception) {
        console.log('error when creating category', exception)
      }
    }
  }
}

export const deleteCategory = (categoryId, collectionId) => {
  console.log('action to delete category', categoryId)
  return async (dispatch) => {
    dispatch(categoryDeleteBegin())
    try {
      await removeEntity('categories', categoryId)
      dispatch(categoryDeleteSuccess(categoryId, collectionId))
    } catch (exception) {
      console.log(exception)
      dispatch(categoryDeleteFailure(exception))
    }
  }
}