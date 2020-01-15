import {
  COLLECTION_CHANGED
} from '../actions'

const initialState = {
  items: [
    {name: 'Medals', id: 1},
    {name: 'Bank notes', id: 2},
    {name: 'Badges', id: 3}
  ],
  currentCollection: null
}

const collectionReducer = (store = initialState, action) => {
  switch (action.type) {
    case COLLECTION_CHANGED:
      return {
        ...store,
        currentCollection: store.items.find(c => c.id == action.payload.collectionId)
      }
    default:
      return store
  }
}

export default collectionReducer