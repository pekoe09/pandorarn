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
    if (collection.id) {
      dispatch(updateCollectionBegin())
      try {
        // call async service here
        console.log('dispatching success')
        dispatch(updateCollectionSuccess(collection))
      } catch (exception) {
        dispatch(updateCollectionFailure(exception))
      }
    } else {
      dispatch(createCollectionBegin())
      try {
        dispatch(createCollectionSuccess(collection))
      } catch (exception) {
        dispatch(createCollectionFailure(exception))
      }
    }
  }
}