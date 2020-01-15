import {
  COLLECTION_CHANGED
} from '../actions'

const initialState = {
  items: [
    {
      name: 'Medals', id: 1,
      categories: [
        {
          name: 'France', 
          id: 1, 
          categories: [
            { name: "Legion d'Honneur", id: 1 },
            { name: 'Campaign Medals', id: 2 },
            { name: 'Croix de Guerre', id: 3 }
          ]
        },
        { name: 'Sweden', id: 2 },
        { name: 'Albania', id: 3 }
      ]
    },
    { name: 'Bank notes', id: 2 },
    { name: 'Badges', id: 3 }
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