import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../services'

export const COLLECTION_CREATE_BEGIN = 'COLLECTION_CREATE_BEGIN'
export const COLLECTION_CREATE_SUCCESS = 'COLLECTION_CREATE_SUCCESS'
export const COLLECTION_CREATE_FAILURE = 'COLLECTION_CREATE_FAILURE'
export const COLLECTION_READ_BEGIN = 'COLLECTION_READ_BEGIN'
export const COLLECTION_READ_SUCCESS = 'COLLETION_READ_SUCCESS'
export const COLLECTION_READ_FAILURE = 'COLLECTION_READ_FAILURE'
export const COLLECTION_UPDATE_BEGIN = 'COLLECTION_UPDATE_BEGIN'
export const COLLECTION_UPDATE_SUCCESS = 'COLLECTION_UPDATE_SUCCESS'
export const COLLECTION_UPDATE_FAILURE = 'COLLECTION_UPDATE_FAILURE'
export const COLLECTION_DELETE_BEGIN = 'COLLECTION_DELETE_BEGIN'
export const COLLECTION_DELETE_SUCCESS = 'COLLECTION_DELETE_SUCCESS'
export const COLLECTION_DELETE_FAILURE = 'COLLECTION_DELETE_FAILURE'
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

export const getCollectionsBegin = () => ({
  type: COLLECTION_READ_BEGIN
})

export const getCollectionsSuccess = collections => ({
  type: COLLECTION_READ_SUCCESS,
  payload: { collections }
})

export const getCollectionsFailure = error => ({
  type: COLLECTION_READ_FAILURE,
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

export const collectionDeleteBegin = () => ({
  type: COLLECTION_DELETE_BEGIN
})

export const collectionDeleteSuccess = collectionId => ({
  type: COLLECTION_DELETE_SUCCESS,
  payload: { collectionId }
})

export const collectionDeleteFailure = error => ({
  type: COLLECTION_DELETE_FAILURE,
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

export const getCollections = () => {
  console.log('getting collections')
  return async (dispatch) => {
    dispatch(getCollectionsBegin())
    try {
      const collections = await getAll('collections')
      dispatch(getCollectionsSuccess(collections))
      if (collections && collections.length > 0) {
        dispatch(changeCollection(collections[0]._id))
      }
    } catch (exception) {
      console.log(exception)
      dispatch(getCollectionsFailure(exception))
    }
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
        console.log(exception)
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

export const deleteCollection = collectionId => {
  console.log('action to delete', collectionId)
  return async (dispatch) => {
    dispatch(collectionDeleteBegin())
    try {
      await removeEntity('collections', collectionId)
      dispatch(collectionDeleteSuccess(collectionId))
    } catch (exception) {
      console.log(exception)
      dispatch(collectionDeleteFailure(exception))
    }
  }
}