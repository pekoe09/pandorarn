import {
  COLLECTION_CHANGED,
  COLLECTION_CREATE_BEGIN,
  COLLECTION_CREATE_SUCCESS,
  COLLECTION_CREATE_FAILURE,
  COLLECTION_UPDATE_BEGIN,
  COLLECTION_UPDATE_SUCCESS,
  COLLECTION_UPDATE_FAILURE
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
            {
              name: 'Campaign Medals',
              id: 2,
              categories: [
                { name: 'Pre-WWI', id: 3 },
                { name: 'WWI', id: 4 }
              ]
            },
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
  currentCollection: null,
  creatingCollection: false,
  updatingCollection: false,
  collectionError: null
}

const collectionReducer = (store = initialState, action) => {
  switch (action.type) {
    case COLLECTION_CHANGED:
      console.log('collection changed', action.payload.collectionId, store.items)
      return {
        ...store,
        currentCollection: store.items.find(c => c.id.toString() === action.payload.collectionId)
      }
    case COLLECTION_CREATE_BEGIN:
      return {
        ...store,
        creatingCollection: true,
        collectionError: null
      }
    case COLLECTION_CREATE_SUCCESS:
      console.log('adding collection', action.payload.collection)
      return {
        ...store,
        items: store.items.concat(action.payload.collection),
        creatingCollection: false,
        collectionError: null
      }
    case COLLECTION_CREATE_FAILURE:
      return {
        ...store,
        creatingCollection: false,
        collectionError: action.payload.error
      }
    case COLLECTION_UPDATE_BEGIN:
      return {
        ...store,
        updatingCollection: true,
        collectionError: null
      }
    case COLLECTION_UPDATE_SUCCESS:
      return {
        ...store,
        items: store.items.map(c => c.id === action.payload.collection.id
          ? action.payload.collection : c),
        updatingCollection: false,
        collectionError: null
      }
    case COLLECTION_UPDATE_FAILURE:
      return {
        ...store,
        updatingCollection: false,
        collectionError: action.payload.error
      }
    default:
      return store
  }
}

export default collectionReducer