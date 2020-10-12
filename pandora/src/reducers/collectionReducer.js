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
  COLLECTION_DELETE_FAILURE,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_SUCCESS
} from '../actions'

const initialState = {
  byId: {},
  allIds: [],
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
        currentCollection: store.byId[action.payload.collectionId],
        collectionError: null
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
      const newCollection = action.payload.collection
      return {
        ...store,
        byId: {
          ...store.byId,
          [newCollection._id]: newCollection
        },
        allIds: store.allIds.concat(newCollection._id),
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
      const collections = action.payload.collections
      return {
        ...store,
        byId: collections.reduce((o, c) => {
          o[c._id] = c
          return o
        }, {}),
        allIds: collections.map(c => c._id),
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
      console.log('hit update success', action.payload.collection, store.byId)
      const collection = action.payload.collection
      return {
        ...store,
        byId: { ...store.byId, [collection._id]: collection },
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
      const deletedId = action.payload.collectionId
      const { [deletedId]: _, ...remaining } = store.byId
      return {
        ...store,
        byId: remaining,
        allIds: store.allIds.filter(id => id !== deletedId),
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
    case CATEGORY_CREATE_SUCCESS:
      const { category, collectionId } = action.payload
      const parent = store.byId[collectionId]
      console.log('found parent', parent)
      console.log('based on', category, collectionId)
      return {
        ...store,
        byId: {
          ...store.byId,
          [collectionId]: {
            ...parent,
            categories: parent.categories
              ? parent.categories.concat(category._id)
              : [category._id]
          }
        }
      }
    case CATEGORY_DELETE_SUCCESS:
      const { categoryId, collectionId: parentId } = action.payload
      const oldParent = store.byId[parentId]
      return {
        ...store,
        byId: {
          ...store.byId,
          [parentId]: {
            ...oldParent,
            categories: oldParent.categories.filter(id => id !== categoryId)
          }
        }
      }
    default:
      console.log('hit default')
      return store
  }
}

export default collectionReducer