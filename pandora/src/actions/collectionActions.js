export const COLLECTION_CHANGED = 'COLLECTION_CHANGED'

export const collectionChanged = (collectionId) => ({
  type: COLLECTION_CHANGED,
  payload: { collectionId }
})


export const changeCollection = (collectionId) => {
  return (dispatch) => {
    dispatch(collectionChanged(collectionId))
  }
}