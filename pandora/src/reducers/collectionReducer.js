import {
  COLLECTION_CHANGED,
  COLLECTION_CREATE_BEGIN,
  COLLECTION_CREATE_SUCCESS,
  COLLECTION_CREATE_FAILURE,
  COLLECTION_READ_BEGIN,
  COLLECTION_READ_SUCCESS,
  COLLECTION_READ_FAILURE,
  COLLECTION_UPDATE_BEGIN,
  COLLECTION_UPDATE_SUCCESS,
  COLLECTION_UPDATE_FAILURE,
  COLLECTION_DELETE_BEGIN,
  COLLECTION_DELETE_SUCCESS,
  COLLECTION_DELETE_FAILURE
} from '../actions'

const initialState = {
  items: [],
  currentCollection: null,
  gettingCollections: false,
  creatingCollection: false,
  updatingCollection: false,
  deletingCollection: false,
  collectionError: null
}

const collectionReducer = (store = initialState, action) => {
  switch (action.type) {
    case COLLECTION_CHANGED:
      console.log('hit changed', action.payload.collectionId, store.items)
      return {
        ...store,
        currentCollection: store.items.find(c => c._id.toString() === action.payload.collectionId)
      }
    case COLLECTION_CREATE_BEGIN:
      console.log('hit start creating')
      return {
        ...store,
        creatingCollection: true,
        collectionError: null
      }
    case COLLECTION_CREATE_SUCCESS:
      console.log('hit create success', action.payload.collection)
      return {
        ...store,
        items: store.items.concat(action.payload.collection),
        creatingCollection: false,
        collectionError: null
      }
    case COLLECTION_CREATE_FAILURE:
      console.log('hit create failure')
      return {
        ...store,
        creatingCollection: false,
        collectionError: action.payload.error
      }
    case COLLECTION_READ_BEGIN:
      console.log('hit read begin')
      return {
        ...store,
        gettingCollections: true,
        collectionError: false
      }
    case COLLECTION_READ_SUCCESS:
      console.log('hit read success', action.payload.collections)
      return {
        ...store,
        items: action.payload.collections,
        gettingCollections: false,
        collectionError: false
      }
    case COLLECTION_READ_FAILURE:
      console.log('hit read failure')
      return {
        ...store,
        gettingCollections: false,
        collectionError: action.payload.error
      }
    case COLLECTION_UPDATE_BEGIN:
      console.log('hit update begin')
      return {
        ...store,
        updatingCollection: true,
        collectionError: null
      }
    case COLLECTION_UPDATE_SUCCESS:
      console.log('hit update success', action.payload.collection, store.items)
      return {
        ...store,
        items: store.items.map(c => c._id === action.payload.collection._id
          ? action.payload.collection : c),
        updatingCollection: false,
        collectionError: null
      }
    case COLLECTION_UPDATE_FAILURE:
      console.log('hit update failure')
      return {
        ...store,
        updatingCollection: false,
        collectionError: action.payload.error
      }
    case COLLECTION_DELETE_BEGIN:
      console.log('hit delete begin')
      return {
        ...store,
        deletingCollection: true,
        collectionError: null
      }
    case COLLECTION_DELETE_SUCCESS:
      console.log('hit delete success', action.payload.collectionId)
      return {
        ...store,
        items: store.items.filter(c => c._id !== action.payload.collectionId),
        deletingCollection: false,
        collectionError: null
      }
    case COLLECTION_DELETE_FAILURE:
      console.log('hit delete failure')
      return {
        ...store,
        deletingCollection: false,
        collectionError: action.payload.error
      }
    default:
      console.log('hit default')
      return store
  }
}

export default collectionReducer