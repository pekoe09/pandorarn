import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../services'

export const COLLECTION_CREATE_BEGIN = 'COLLECTION_CREATE_BEGIN'
export const COLLECTION_CREATE_SUCCESS = 'COLLECTION_CREATE_SUCCESS'
export const COLLECTION_CREATE_FAILURE = 'COLLECTION_CREATE_FAILURE'
export const COLLECTION_UPDATE_BEGIN = 'COLLECTION_UPDATE_BEGIN'
export const COLLECTION_UPDATE_SUCCESS = 'COLLECTION_UPDATE_SUCCESS'
export const COLLECTION_UPDATE_FAILURE = 'COLLECTION_UPDATE_FAILURE'
export const COLLECTION_CHANGED = 'COLLECTION_CHANGED'

export const createCollectionBegin = () => ({
  type: COLLECTION_CREATE_BEGIN
})

export const createCollectionSuccess = collection => ({
  type: COLLECTION_CREATE_SUCCESS,
  payload: { collection }
})

export const createCollectionFailure = error => ({
  type: COLLECTION_CREATE_FAILURE,
  payload: { error }
})

export const updateCollectionBegin = () => ({
  type: COLLECTION_UPDATE_BEGIN
})

export const updateCollectionSuccess = collection => ({
  type: COLLECTION_UPDATE_SUCCESS,
  payload: { collection }
})

export const updateCollectionFailure = error => ({
  type: COLLECTION_UPDATE_FAILURE,
  payload: { error }
})

export const collectionChanged = collectionId => ({
  type: COLLECTION_CHANGED,
  payload: { collectionId }
})

export const changeCollection = collectionId => {
  return (dispatch) => {
    dispatch(collectionChanged(collectionId))
  }
}

export const saveCollection = collection => {
  console.log('action to save', collection)
  return async (dispatch) => {
    if (collection._id) {
      console.log('hit existing collection')
      dispatch(updateCollectionBegin())
      try {
        collection = await updateEntity('collections', collection)
        console.log('dispatching success')
        dispatch(updateCollectionSuccess(collection))
      } catch (exception) {
        dispatch(updateCollectionFailure(exception))
      }
    } else {
      console.log('hit new collection')
      dispatch(createCollectionBegin())
      try {
        collection = await addEntity('collections', collection)
        console.log('new collection created')
        dispatch(createCollectionSuccess(collection))
      } catch (exception) {
        console.log(exception)
        dispatch(createCollectionFailure(exception))
      }
    }
  }
}